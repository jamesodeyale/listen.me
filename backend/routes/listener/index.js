const router = require("express-promise-router")();
const { checkDuplicateEmail } = require("../../middleware");
const { authentication } = require("../../controllers/listener");

router.route("/register", [checkDuplicateEmail]).post(authentication.register);

router.route("/login").get(authentication.login);

module.exports = router;
