const router = require("express-promise-router")();
const { checkDuplicateEmail } = require("../../middleware/verifySignUp");

const adminController = require("../../controllers/admin/authentication");

router.route("/register", [checkDuplicateEmail]).post(adminController.register);

router.route("/login").get(adminController.login);

module.exports = router;
