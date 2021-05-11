const db = require("../../db");

const {
  validateRegistration,
  validateLogin
} = require("../../validation/admin");

register = async (req, res) => {
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
  } catch (error) {
    res.status(404).json({
      status: "failed",
      error: {
        message: "An error occurred. Please try again!"
      }
    });
  }
};

login = async (req, res) => {
  try {
    const { errors, isValid } = validateLogin(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    const userAccount = await db.query(
      "SELECT account_id, first_name, last_name, email FROM account WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (userAccount.rows.length > 0) {
      const adminAccount = await db.query(
        "SELECT * FROM admin WHERE account_id = $1",
        [userAccount.rows[0].account_id]
      );

      res.status(200).json({
        status: "success",
        data: {
          account: userAccount.rows[0],
          admin: adminAccount.rows[0]
        }
      });
    } else {
      res.status(404).json({
        status: "failed",
        error: {
          message: "Wrong email and password combination"
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "failed",
      error: {
        message: "An error occurred. Please try again!"
      }
    });
  }
};

const authentication = {
  register,
  login
};

module.exports = authentication;
