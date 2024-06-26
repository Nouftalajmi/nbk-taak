const bcrypt = require("bcrypt");
const db = require("../../database");
const jwt = require("jsonwebtoken");
const config = require("../../config/keys");

const hashPass = async (password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

const generateToken = (username) => {
  const token = jwt.sign({ username: username }, config.JWT_SECRET);
  return token;
};

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      next("Please enter a valid information");
    }

    const hashPassword = await hashPass(password);

    db.run(
      `INSERT INTO User (username, password) VALUES (?, ?)`,
      [username, hashPassword],
      async function (err) {
        if (err) {
          console.error(err.message);
          return;
        }
        const id = this.lastID;
        const token = generateToken(username);
        return res.json({ token });
      }
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const token = generateToken(req.user.username);
    return res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
