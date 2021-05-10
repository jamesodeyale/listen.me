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

      const checkEmail = await db.query(
        "SELECT * FROM account WHERE email = $1",
        [email]
      );

      if (checkEmail.rows.length > 0) {
        res.status(404).json({
          status: "failed",
          error: {
            message: "Email already exists"
          }
        });
      } else {
        const newAccount = await db.query(
          "INSERT INTO account (email, first_name, last_name, password) VALUES ($1, $2 ,$3 ,$4) RETURNING *",
          [email, first_name, last_name, password]
        );

        const findAccount = await db.query(
          "SELECT * FROM account WHERE email = $1",
          [email]
        );

        const newAdmin = await db.query(
          "INSERT INTO admin (account_id) VALUES ($1) RETURNING *",
          [findAccount.rows[0].account_id]
        );

        res.status(200).json({
          status: "success",
          data: {
            account: newAccount.rows[0],
            admin: newAdmin.rows[0]
          }
        });
      }
    } catch (error) {
      res.status(404).json({
        status: "failed",
        error: {
          message: "An error occurred. Please try again!"
        }
      });
    }
  }
};
