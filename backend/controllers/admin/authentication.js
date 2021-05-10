const db = require("../../db");

const { validateRegistration } = require("../../validation/admin");

module.exports = {
  register: async (req, res, next) => {
    try {
      const { errors, isValid } = validateRegistration(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const { email, first_name, last_name, password } = req.body;

      const newAccount = await db.query(
        "INSERT INTO account (email, first_name, last_name, password) VALUES ($1, $2 ,$3 ,$4) RETURNING *",
        [email, first_name, last_name, password]
      );

      res.status(200).json({
        status: "success",
        data: {
          account: newAccount.rows[0]
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};
