const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const cors = require("cors");
const config = require("./config/keys");
const app = express();
const db = require("./database");

const { localStrategy, jwtStrategy } = require("./middleware/passort");
const authRouter = require("./api/auth/routers");
const customrsRouter = require("./api/customers/routers");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/auth", authRouter);
app.use("/customers", customrsRouter);

app.listen(8000, () => {
  console.log("app is running on port 8000");
});
