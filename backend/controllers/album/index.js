const db = require("../../db");

createAlbum = async (req, res) => {
  try {
    console.log(req.body);
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
