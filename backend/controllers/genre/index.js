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

const genre = {
  createGenre
};

module.exports = {
  genre
};
