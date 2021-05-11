const db = require("../../db");
const { validateAlbum } = require("../../validation/album");
const { song } = require("../song");

createAlbum = async (req, res) => {
  try {
    const { errors, isValid } = validateAlbum(req.body);

    if (!isValid) {
      return res.status(400).json({
        status: "failed",
        error: {
          errors,
          message: null
        }
      });
    }

    const { name, publisher_id, genre_id } = req.body;

    const { rows } = await db.query(
      "INSERT INTO album (genre_id, publisher_id, name) values ($1, $2, $3) returning *",
      [genre_id, publisher_id, name]
    );

    if (rows.length > 0) {
      song.uploadSong(req, res);
    }

    res.status(200).json({
      status: "success",
      data: {
        album: rows[0]
      }
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      error: {
        errors: null,
        message: "Error occurred. Please try again."
      }
    });
  }
};

editAlbum = async (req, res) => {
  try {
  } catch (error) {
    res.status(404).json({
      status: "failed",
      error: {
        errors: null,
        message: "Error occurred. Please try again."
      }
    });
  }
};

deleteAlbum = async (req, res) => {
  try {
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

getAllAlbumByPublisher = async (req, res) => {
  try {
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

getAlbum = async (req, res) => {
  try {
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

const album = {
  createAlbum,
  editAlbum,
  deleteAlbum,
  getAllAlbumByPublisher,
  getAlbum
};

module.exports = {
  album
};
