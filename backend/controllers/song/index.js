const db = require("../../db");
const { s3Actions } = require("../../utils/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");
const upload = multer({ dest: "./uploads/" }).array("songs", 24);

uploadSong = async (req, res) => {
  try {
    upload(req, res, () => {
      try {
        const songs = req.files;
        console.log(songs);
        songs.map(async (song) => {
          const response = await s3Actions.uploadFile(song);
          //    delte file after uploading to database and s3
          // await unlinkFile(file.path);
          console.log(response);
        });
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
