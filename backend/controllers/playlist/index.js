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

addSongToPlaylist = async (req, res) => {
  try {
    const { playlist_id, song_id } = req.body;

    const { rows } = await db.query(
      "INSERT INTO playlistSong (playlist_id, song_id) values ($1, $2) returning *",
      [playlist_id, song_id]
    );

    if (rows.length > 0) {
      res.status(200).json({
        status: "success",
        data: {
          playlistSong: rows[0]
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

removeSongOnPlaylist = async (req, res) => {
  try {
    const { playlist_song_id } = req.params;
    await db.query(
      `DELETE FROM playlistSong WHERE playlist_song_id=${playlist_song_id}`
    );
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

getAllSongsOnPlaylist = async (req, res) => {
  try {
    const { playlist_id } = req.body;
    const { rows } =
      await db.query(`select ps.playlist_song_id, p.name, p.listener_id, s.song_id, s.album_id, s.name, s.link_to_song, s.filename, a.first_name, a.last_name from playlistSong ps
    left join playlist p on p.playlist_id = ps.playlist_id
    left join song s on ps.song_id = s.song_id
    left join publisher p2 on s.publisher_id = p2.publisher_id
    left join account a on p2.account_id = a.account_id
    where ps.playlist_id=${playlist_id}
    order by ps.playlist_song_id
`);
    res.status(200).json({
      status: "success",
      data: {
        songsOnPlaylist: rows
      }
    });
  } catch (e) {
    console.log(e);
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
  getAllPlaylist,
  addSongToPlaylist,
  removeSongOnPlaylist,
  getAllSongsOnPlaylist
};

module.exports = {
  playlist
};
