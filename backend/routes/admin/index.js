const router = require("express-promise-router")();

const adminController = require("../../controllers/admin/authentication");

router.route("/register").post(adminController.register);

router.route("/login").get(adminController.login);

module.exports = router;
