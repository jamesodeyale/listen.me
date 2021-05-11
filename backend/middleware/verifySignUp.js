const db = require("../db");

checkDuplicateEmail = async (req, res, next) => {
  try {
    const checkEmail = await db.query(
      "SELECT * FROM account WHERE email = $1",
      [email]
    );

    checkEmail.rows.length > 0
      ? res.status(404).json({
          status: "failed",
          error: {
            message: "Email already exists"
          }
        })
      : next();
  } catch (error) {
    console.log(error);
  }
};

const verifySignUp = {
  checkDuplicateEmail
};

module.exports = verifySignUp;
