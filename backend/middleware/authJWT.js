const jwt = require("jsonwebtoken");
const config = require("../config");
const db = require("../db");

verifyToken = async (req, res, next) => {
  // make sure the frontend passes the token in headers.x-access-token

  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(400).json({
      error: {
        errors: null,
        message: "Token is not provided",
        accessToken: null
      }
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JSONWEBTOKEN_SK);
    const text = "SELECT * FROM account WHERE account_id = $1";
    const { rows } = await db.query(text, [decoded.userId]);
    if (!rows[0]) {
      return res.status(400).json({
        error: {
          errors: null,
          message: "The token you provided is invalid",
          accessToken: null
        }
      });
    }
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    res.status(404).json({
      status: "failed",
      error: {
        errors: null,
        message: "An error occurred. Please try again!"
      }
    });
  }
};

const Auth = {
  verifyToken
};

module.exports = { Auth };
