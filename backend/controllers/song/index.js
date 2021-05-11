const db = require("../../db");
const { s3Actions } = require("../../utils/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");
const upload = multer({ dest: "./uploads/" }).single("song");

uploadSong = async (req, res) => {
  try {
    const { album_id, publisher_id, name } = req.body;
    upload(req, res, async () => {
      const { song } = req.files;
      try {
        const response = await s3Actions.uploadFile(song);
        //    delte file after uploading to database and s3
        try {
          const { rows } = await db.query(
            "INSERT INTO song (album_id, publisher_id, name, link_to_song, filename, length_of_song) values ($1, $2, $3, $4, $5, $6) returning *",
            [
              album_id,
              publisher_id,
              name,
              response.location,
              response.key,
              "0:00"
            ]
          );

          if (rows.length > 0) {
            res.status(200).json({
              status: "success",
              data: {
                song: rows[0]
              }
            });
          } else {
            res.status(404).json({
              status: "failed",
              error: {
                errors: null,
                message: "Error occurred. Please try again."
              }
            });
          }

          await unlinkFile(song.path);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
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
