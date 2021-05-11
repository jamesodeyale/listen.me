const router = require("express-promise-router")();
const { album } = require("../../controllers/album");
const { Auth } = require("../../middleware/authJWT");

router.route("/create").post(Auth.verifyToken, album.createAlbum);

module.exports = router;
