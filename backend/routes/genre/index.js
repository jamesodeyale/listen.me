const router = require("express-promise-router")();
const { genre } = require("../../controllers/genre");

router.route("/create-genre").post(genre.createGenre);

router.route("/edit-genre/:genre_id").put(genre.editGenre);

module.exports = router;
