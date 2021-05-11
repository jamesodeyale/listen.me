const db = require("../../db");
const { s3Actions } = require("../../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");
const upload = multer({ dest: "./uploads/" }).array("song", 24);

uploadSong = async (req, res) => {
  try {
    upload(req, res, () => {
      const files = req.files;
      try {
        files.map(async (file) => {
          const response = await s3Actions.uploadFile(file);
          //    delte file after uploading to database and s3
          await unlinkFile(file.path);
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
