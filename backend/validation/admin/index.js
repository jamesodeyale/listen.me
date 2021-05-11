const Validator = require("Validator");
const isEmpty = require("../is-empty");

validateRegistration = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

validateLogin = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const adminValidation = {
  validateRegistration,
  validateLogin
};

module.exports = adminValidation;
