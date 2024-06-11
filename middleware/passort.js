const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;

const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

const bcrypt = require("bcrypt");
const config = require("../config/keys");
const db = require("../database");

exports.localStrategy = new LocalStrategy(
  { usernameField: "username" },
  async (username, password, done) => {
    try {
      await db.get(
        `SELECT * FROM User WHERE username = ?`,
        [username],
        async function (err, row) {
          if (err) {
            console.error(err.message);
            return;
          }
          const foundUser = row;

          if (!foundUser) {
            return done(null, false);
          }

          const passwordMatch = await bcrypt.compare(
            password,
            foundUser.password
          );
          if (!passwordMatch) {
            return done(null, false);
          }
          console.log(foundUser);
          return done(null, foundUser);
        }
      );
    } catch (error) {
      return done(error);
    }
  }
);

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
  },
  async (jwtPayload, done) => {
    try {
      console.log(jwtPayload);
      db.get(
        `SELECT * FROM User WHERE username = ?`,
        [jwtPayload.username],
        async function (err, row) {
          if (err) {
            console.error(err.message);
            return;
          }
          const foundUser = row;

          if (!foundUser) {
            return done(null, false);
          }

          return done(null, foundUser);
        }
      );
    } catch (error) {
      done(error);
    }
  }
);
