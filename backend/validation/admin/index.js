const Validator = require("validator");
const isEmpty = require("../is-empty");

validateRegistration = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }

  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First name is required";
  }

  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Last name is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (data.password.length < 8) {
    errors.password = "Password must have a minimum of 8 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

validateLogin = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

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
