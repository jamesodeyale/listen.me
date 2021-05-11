const jwt = require("jsonwebtoken");
const config = require("../config");
const db = require("../db");

verifyToken = (req, res, next) => {
  // make sure the frontend passes the token in headers.x-access-token
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized"
      });
    }

    req.account_id = decoded.id;
    next();
  });
};

const authJWT = {
  verifyToken
};

module.exports = authJWT;
