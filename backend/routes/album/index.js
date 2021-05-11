const router = require("express-promise-router")();
const { album } = require("../../controllers/album");
const { Auth } = require("../../middleware/authJWT");

router.route("/create").post(Auth.verifyToken, album.createAlbum);

router.route("/edit/:album_id").put(album.editAlbum);

router.route("/delete/:album_id").delete(album.deleteAlbum);

router.route("/single/:album_id").get(album.getAlbum);

router.route("/albums_by/:publisher_id").get(album.getAllAlbumByPublisher);

module.exports = router;
