const db = require("../../db");
const { validateAlbum } = require("../../validation/album");

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

    const { name, publisher_id, genre_id, description } = req.body;

    const { rows } = await db.query(
      "INSERT INTO album (genre_id, publisher_id, name, description) values ($1, $2, $3, $4) returning *",
      [genre_id, publisher_id, name, description]
    );

    if (rows.length > 0) {
      res.status(200).json({
        status: "success",
        data: {
          album: rows[0]
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

editAlbum = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { album_id } = req.params;
    const { rows } = await db.query(
      `update album set name=$1, description=$2 where album_id=${album_id} returning *`,
      [name, description]
    );

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

deleteAlbum = async (req, res) => {
  try {
    const { album_id } = req.params;
    await db.query(`DELETE FROM album WHERE album_id=${album_id}`);
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

getAllAlbumByPublisher = async (req, res) => {
  try {
    const { publisher_id } = req.params;
    const { rows } = await db.query(
      `select * from album where publisher_id=${publisher_id}`
    );
    res.status(200).json({
      status: "success",
      data: {
        albums: rows
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

getAlbum = async (req, res) => {
  try {
    const { album_id } = req.params;
    const { rows } = await db.query(
      `select * from album where album_id=${album_id}`
    );
    res.status(200).json({
      status: "success",
      data: {
        album: rows[0]
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
