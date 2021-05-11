const router = require("express-promise-router")();
const { genre } = require("../../controllers/genre");

router.route("/create-genre").post(genre.createGenre);

module.exports = router;
