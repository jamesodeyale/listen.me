const db = require("../../db");
const config = require("../../config");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

const {
  validateRegistration,
  validateLogin
} = require("../../validation/listener");

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

    const { email, first_name, last_name, password, address, country } =
      req.body;

    const findAccount = await db.query(
      "SELECT * FROM account WHERE email = $1",
      [email]
    );

    if (findAccount.rows.length > 0) {
      const findListener = await db.query(
        "SELECT * FROM listener WHERE account_id = $1",
        [findAccount.rows[0].account_id]
      );

      if (findListener.rows.length > 0) {
        res.status(404).json({
          status: "failed",
          error: {
            errors: null,
            message: "Account already exists. Please login"
          }
        });
      } else {
        try {
          const newListener = await db.query(
            "INSERT INTO listener (account_id, address, country) VALUES ($1, $2, $3) RETURNING *",
            [findAccount.rows[0].account_id, address, country]
          );

          res.status(200).json({
            status: "success",
            data: {
              account: {
                account_id: findAccount.rows[0].account_id,
                first_name: findAccount.rows[0].first_name,
                last_name: findAccount.rows[0].last_name,
                email: findAccount.rows[0].email
              },
              listener: newListener.rows[0]
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      try {
        const hashedPassword = bcrypt.hashSync(password, 8);

        const newAccount = await db.query(
          "INSERT INTO account (email, first_name, last_name, password) VALUES ($1, $2 ,$3 ,$4) RETURNING *",
          [email, first_name, last_name, hashedPassword]
        );

        const newListener = await db.query(
          "INSERT INTO listener (account_id, address, country) VALUES ($1, $2, $3) RETURNING *",
          [findAccount.rows[0].account_id, address, country]
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
            listener: newListener.rows[0]
          }
        });
      } catch (error) {
        console.log(error);
      }
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

      const listenerAccount = await db.query(
        "SELECT * FROM listener WHERE account_id = $1",
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
          listener: listenerAccount.rows[0],
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
