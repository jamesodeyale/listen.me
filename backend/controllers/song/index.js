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
        //    delete file after uploading to database and s3
        try {
          const { rows } = await db.query(
            "INSERT INTO song (album_id, publisher_id, name, link_to_song, filename, length_of_song) values ($1, $2, $3, $4, $5, $6) returning *",
            [
              album_id,
              publisher_id,
              name,
              response.Location,
              response.Key,
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

editSong = async (req, res) => {
  try {
    const { album_id, name } = req.body;
    const { song_id } = req.params;
    upload(req, res, async () => {
      const { song } = req.files;
      try {
        const response = await s3Actions.uploadFile(song);
        const { rows } = await db.query(
          `update song set name=$1, album_id=$2, link_to_song=$3, filename=$4 where song_id=${song_id} returning *`,
          [name, album_id, response.Location, response.Key]
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
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "failed",
      error: {
        errors: null,
        message: "Error occurred. Please try again."
      }
    });
  }
};

getASong = async (req, res) => {
  try {
    const { song_id } = req.params;
    const { rows } = await db.query(
      `select * from song where song_id=${song_id} order by song_id desc`
    );
    res.status(200).json({
      status: "success",
      data: {
        song: rows[0]
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "failed",
      error: {
        errors: null,
        message: "Error occurred. Please try again."
      }
    });
  }

  // const key = rows[0].filename;
  // const readStream = getFileStream(key);

  // readStream.pipe(res);
};

getAllSongsInAlbum = async (req, res) => {
  try {
    const { album_id } = req.params;
    const { rows } = await db.query(
      `select * from song where album_id=${album_id} order by song_id`
    );
    res.status(200).json({
      status: "success",
      data: {
        songs: rows
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "failed",
      error: {
        errors: null,
        message: "Error occurred. Please try again."
      }
    });
  }
};

getAllSongsByPublisher = async (req, res) => {
  try {
    const { publisher_id } = req.params;
    const { rows } = await db.query(
      `select * from song where publisher_id=${publisher_id}`
    );
    res.status(200).json({
      status: "success",
      data: {
        songs: rows
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "failed",
      error: {
        errors: null,
        message: "Error occurred. Please try again."
      }
    });
  }
};

deleteSong = async (req, res) => {
  try {
    const { song_id } = req.params;
    await db.query(`DELETE FROM song WHERE song_id=${song_id}`);
    res.status(200).json({
      status: "success",
      data: null
    });
  } catch (e) {
    res.status(404).json({
      status: "failed",
      error: {
        errors: null,
        message: "Error occurred. Please try again."
      }
    });
  }
};

const song = {
  uploadSong,
  getASong,
  editSong,
  deleteSong,
  getAllSongsByPublisher,
  getAllSongsInAlbum
};

module.exports = {
  song
};
