const router = require("express-promise-router")();
const { genre } = require("../../controllers/genre");

router.route("/create").post(genre.createGenre);

router.route("/edit/:genre_id").put(genre.editGenre);

router.route("/delete/:genre_id").put(genre.deleteGenre);

router.route("/all").post(genre.getAllGenres);

module.exports = router;
