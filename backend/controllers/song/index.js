const db = require("../../db");
const { s3Actions } = require("../../utils/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");
const upload = multer({ dest: "./uploads/" }).array("songs", 24);

uploadSong = async (req, res) => {
  try {
    const { songs } = req.files;
    const { album_id, publisher_id } = req.body;
    console.log(req.body);
    listOfSongs = [];

    await upload(req, res, () => {
      try {
        songs.map(async (song) => {
          const response = await s3Actions.uploadFile(song);
          //    delete file after uploading to database and s3
          const songName = song.name.toLowerCase().split(".mp3" || ".jpg")[0];
          try {
            const { rows } = await db.query(
              "INSERT INTO song (album_id, publisher_id, name, link_to_song, filename, length_of_song) values ($1, $2, $3, $4, $5, $6) returning *",
              [
                album_id,
                publisher_id,
                songName,
                response.location,
                response.key,
                "0:00"
              ]
            );

            listOfSongs.push(rows[0]);
            await unlinkFile(song.path);
          } catch (error) {
            console.log(error);
          }
        });
      } catch (error) {
        console.log(error);
      }
    });

    res.status(200).json({
      status: "success",
      data: {
        album: req.body,
        songs: listOfSongs
      }
    });
  } catch (error) {
    console.log(error);
  }
};

getASong = async (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
};

const song = { uploadSong, getASong };

module.exports = {
  song
};
