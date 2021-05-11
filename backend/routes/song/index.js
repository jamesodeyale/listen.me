const router = require("express-promise-router")();
const { song } = require("../../controllers/song");

router.route("/create").post(song.uploadSong);

module.exports = router;
