const express = require("express");
const { register, login } = require("./controllers");
const passport = require("passport");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

authRouter.get(
  "/hi",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    return res.json("hi");
  }
);

module.exports = authRouter;
