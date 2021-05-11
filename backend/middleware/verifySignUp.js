const db = require("../db");

checkDuplicateEmail = async (req, res, next) => {
  const checkEmail = await db.query("SELECT * FROM account WHERE email = $1", [
    email
  ]);

  checkEmail.rows.length > 0
    ? res.status(404).json({
        status: "failed",
        error: {
          message: "Email already exists"
        }
      })
    : next();
};

const verifySignUp = {
  checkDuplicateEmail
};

module.exports = verifySignUp;
