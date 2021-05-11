const router = require("express-promise-router")();
const { album } = require("../../controllers/album");

router.route("/create").post(album.createAlbum);

module.exports = router;
