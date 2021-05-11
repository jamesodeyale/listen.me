const db = require("../../db");
const config = require("../../config");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

const {
  validateRegistration,
  validateLogin
} = require("../../validation/admin");

register = async (req, res) => {
  try {
    const { errors, isValid } = validateRegistration(req.body);

    if (!isValid) {
      return res.status(400).json({
        status: "failed",
        error: {
          errors,
          message: null
        }
      });
    }

    const { email, first_name, last_name, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    const newAccount = await db.query(
      "INSERT INTO account (email, first_name, last_name, password) VALUES ($1, $2 ,$3 ,$4) RETURNING *",
      [email, first_name, last_name, hashedPassword]
    );

    const newAdmin = await db.query(
      "INSERT INTO admin (account_id) VALUES ($1) RETURNING *",
      [newAccount.rows[0].account_id]
    );

    res.status(200).json({
      status: "success",
      data: {
        account: {
          account_id: newAccount.rows[0].account_id,
          first_name: newAccount.rows[0].first_name,
          last_name: newAccount.rows[0].last_name,
          email: newAccount.rows[0].email
        },
        admin: newAdmin.rows[0]
      }
    });
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

login = async (req, res) => {
  try {
    const { errors, isValid } = validateLogin(req.body);

    if (!isValid) {
      return res.status(400).json({
        status: "failed",
        error: {
          errors,
          message: null
        }
      });
    }

    const { email, password } = req.body;

    const userAccount = await db.query(
      "SELECT * FROM account WHERE email = $1",
      [email]
    );

    if (userAccount.rows.length > 0) {
      let passwordIsValid = bcrypt.compareSync(
        password,
        userAccount.rows[0].password
      );

      if (!passwordIsValid) {
        return res.status(401).json({
          error: {
            errors: null,
            message: "Invalid Password!",
            accessToken: null
          }
        });
      }

      let token = jwt.sign(
        { id: userAccount.rows[0].account_id },
        config.secret,
        {
          expiresIn: 86400
        }
      );

      const adminAccount = await db.query(
        "SELECT * FROM admin WHERE account_id = $1",
        [userAccount.rows[0].account_id]
      );

      res.status(200).json({
        status: "success",
        data: {
          account: {
            account_id: userAccount.rows[0].account_id,
            first_name: userAccount.rows[0].first_name,
            last_name: userAccount.rows[0].last_name,
            email: userAccount.rows[0].email
          },
          admin: adminAccount.rows[0],
          accessToken: token
        }
      });
    } else {
      res.status(404).json({
        status: "failed",
        error: {
          errors: null,
          message: "Account not found."
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "failed",
      error: {
        errors: null,
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
