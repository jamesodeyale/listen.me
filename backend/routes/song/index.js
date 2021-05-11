const router = require("express-promise-router")();
const { song } = require("../../controllers/song");
const { Auth } = require("../../middleware/authJWT");

router.route("/create").post(Auth.verifyToken, song.uploadSong);

module.exports = router;
