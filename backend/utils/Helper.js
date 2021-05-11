const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Hash Password Method
 * @param {string} password
 * @returns {string} returns hashed password
 */
hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
/**
 * @param {string} hashPassword
 * comparePassword
 * @param {string} password
 * @returns {Boolean} return True or False
 */
comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};
/**
 * isValidEmail helper method
 * @param {string} email
 * @returns {Boolean} True or False
 */
isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};
/**
 * Gnerate Token
 * @param {string} id
 * @returns {string} token
 */
generateToken = (id) => {
  const token = jwt.sign(
    {
      userId: id
    },
    process.env.JSONWEBTOKEN_SK,
    { expiresIn: "7d" }
  );
  return token;
};

const Helper = {
  hashPassword,
  comparePassword,
  isValidEmail,
  generateToken
};

module.exports = { Helper };
