const Validator = require("validator");
const isEmpty = require("../is-empty");

validateAlbum = (data) => {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.genre_id = !isEmpty(data.genre_id) ? data.genre_id : "";
  data.publisher_id = !isEmpty(data.publisher_id) ? data.publisher_id : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Album name is required";
  }

  if (Validator.isEmpty(data.genre_id)) {
    errors.genre_id = "Genre is required";
  }

  if (Validator.isEmpty(data.publisher_id)) {
    errors.publisher_id = "Publisher is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const albumValidation = {
  validateAlbum
};

module.exports = albumValidation;
