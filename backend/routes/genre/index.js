const router = require("express-promise-router")();
const { genre } = require("../../controllers/genre");

router.route("/create").post(genre.createGenre);

router.route("/edit/:genre_id").put(genre.editGenre);

router.route("/delete/:genre_id").delete(genre.deleteGenre);

router.route("/all").get(genre.getAllGenres);

router.route("/single/:genre_id").get(genre.getAGenre);

module.exports = router;
