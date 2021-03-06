const db = require("../../db");

createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const newGenre = await db.query(
      "INSERT INTO genre (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.status(200).json({
      status: "success",
      data: {
        genre: newGenre.rows[0]
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

editGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const { genre_id } = req.params;
    const { rows } = await db.query(
      `update genre set name=$1 where genre_id=${genre_id} returning *`,
      [name]
    );

    res.status(200).json({
      status: "success",
      data: {
        genre: rows[0]
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

deleteGenre = async (req, res) => {
  try {
    const { genre_id } = req.params;
    await db.query(`DELETE FROM genre WHERE genre_id=${genre_id}`);
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

getAllGenres = async (req, res) => {
  try {
    const { rows } = await db.query(
      "select * from genre order by genre_id asc"
    );
    res.status(200).json({
      status: "success",
      data: {
        genres: rows
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

getAGenre = async (req, res) => {
  try {
    const { genre_id } = req.params;
    const { rows } = await db.query(
      `select * from genre where genre_id=${genre_id}`
    );
    res.status(200).json({
      status: "success",
      data: {
        genres: rows[0]
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

const genre = {
  createGenre,
  editGenre,
  deleteGenre,
  getAllGenres,
  getAGenre
};

module.exports = {
  genre
};
