const db = require("../../db");

createPlaylist = async (req, res) => {
  try {
    const { name, listener_id } = req.body;

    const { rows } = await db.query(
      "INSERT INTO playlist (name, listener_id) values ($1, $2) returning *",
      [name, listener_id]
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

editPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    const { playlist_id } = req.params;
    const { rows } = await db.query(
      `update playlist set name=$1 where playlist_id=${playlist_id} returning *`,
      [name]
    );

    res.status(200).json({
      status: "success",
      data: {
        playlist: rows[0]
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

deletePlaylist = async (req, res) => {
  try {
    const { playlist_id } = req.params;
    await db.query(`DELETE FROM playlist WHERE playlist_id=${playlist_id}`);
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

getAPlaylist = async (req, res) => {
  try {
    const { playlist_id } = req.params;
    const { rows } = await db.query(
      `select * from playlist where playlist_id=${playlist_id}`
    );
    res.status(200).json({
      status: "success",
      data: {
        playlist: rows[0]
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

getAllPlaylist = async (req, res) => {
  try {
    const { listener_id } = req.params;
    const { rows } = await db.query(
      `select * from playlist where listener_id=${listener_id}`
    );
    res.status(200).json({
      status: "success",
      data: {
        playlists: rows
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

const playlist = {
  createPlaylist,
  editPlaylist,
  deletePlaylist,
  getAPlaylist,
  getAllPlaylist
};

module.exports = {
  playlist
};
