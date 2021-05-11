const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const config = require("./config");
const Admin = require("./models/Admin.model");
const User = require("./models/User.model");

// JSON WEBTOKENS STRATEGY
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret
    },
    async (payload, done) => {
      if (payload.user_account === "admin") {
        try {
          // Find user specified in the token
          const admin = await Admin.findById(payload.sub);

          // If user does not exist, handle it
          if (!admin) {
            return done(null, false);
          }

          // Otherwise return the user
          done(null, admin);
        } catch (error) {
          done(error, false);
        }
      } else if (payload.user_account === "user") {
        try {
          // Find user specified in the token
          const user = await User.findById(payload.sub);

          // If user does not exist, handle it
          if (!user) {
            return done(null, false);
          }

          // Otherwise return the user
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    }
  )
);

// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        // Check if the user with this email exists
        const user = await User.findOne({ email });
        //   If not, handle it
        if (!user) {
          return done(null, false);
        }
        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
          return done(null, false);
        }
        // Otherwise, handle it
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
