require("dotenv").config();
const config = {
  JWT_SECRET: process.env.JWT_SECRET,
};

for (let key in config) {
  if (!config[key]) {
    console.log("ENV values missing!");
    process.exit(1);
  }
}

module.exports = config;
