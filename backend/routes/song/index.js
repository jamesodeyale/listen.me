const router = require("express-promise-router")();
const { song } = require("../../controllers/song");
const { Auth } = require("../../middleware/authJWT");

router.route("/create").post(Auth.verifyToken, song.uploadSong);

router.route("/edit/:song_id").put(Auth.verifyToken, song.editSong);

router.route("/delete/:song_id").delete(Auth.verifyToken, song.deleteSong);

router.route("/single/:song_id").get(Auth.verifyToken, song.getASong);

router
  .route("/by_publisher/:publisher_id")
  .get(Auth.verifyToken, song.getAllSongsByPublisher);

router
  .route("/in_album/:album_id")
  .get(Auth.verifyToken, song.getAllSongsInAlbum);

module.exports = router;
