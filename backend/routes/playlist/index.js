const router = require("express-promise-router")();
const { playlist } = require("../../controllers/playlist");
const { Auth } = require("../../middleware/authJWT");

router.route("/create").post(Auth.verifyToken, playlist.createPlaylist);

router.route("/edit/:playlist_id").put(Auth.verifyToken, playlist.editPlaylist);

router
  .route("/delete/:playlist_id")
  .delete(Auth.verifyToken, playlist.deletePlaylist);

router
  .route("/single/:playlist_id")
  .get(Auth.verifyToken, playlist.getAPlaylist);

router
  .route("/playlist_for/:listener_id")
  .get(Auth.verifyToken, playlist.getAllPlaylist);

router.route("/add_song").post(Auth.verifyToken, playlist.addSongToPlaylist);

router
  .route("/remove_song/:playlist_song_id")
  .delete(Auth.verifyToken, playlist.removeSongOnPlaylist);

router
  .route("/songs_on_playlist/")
  .get(Auth.verifyToken, playlist.getAllSongsOnPlaylist);

module.exports = router;
