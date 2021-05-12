const db = require("../../db");

searchForMusicAndArtist = async (req, res) => {
  try {
    const { search } = req.body;
    const songSearch = await db.query(
      `select * from song where lower(name) like '%${search}%'`
    );

    const publisherSearch = await db.query(
      `select * from account where lower(first_name) like '%${search}%' or lower(last_name) like '%${search}%'`
    );

    const albumSearch = await db.query(
      `select * from album where lower(name) like '%${search}%'`
    );

    res.status(200).json({
      status: "success",
      data: {
        songs: songSearch.rows,
        publisher: publisherSearch.rows,
        albumSearch: albumSearch.rows
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
const search = {
  searchForMusicAndArtist
};

module.exports = { search };
