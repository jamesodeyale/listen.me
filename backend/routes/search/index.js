const router = require("express-promise-router")();
const { search } = require("../../controllers/search");
const { Auth } = require("../../middleware/authJWT");

router
  .route("/searchFor")
  .get(Auth.verifyToken, search.searchForMusicAndArtist);

module.exports = router;
