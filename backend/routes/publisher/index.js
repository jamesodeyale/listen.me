const router = require("express-promise-router")();
const { authentication } = require("../../controllers/publisher");

router.route("/register").post(authentication.register);

router.route("/login").get(authentication.login);

module.exports = router;
