require("dotenv").config();
const config = {
  JWT_SECRECT: process.env.JWT_SECRECT,
};

for (let key in config) {
  if (!config[key]) {
    console.log("ENV values missing!");
    process.exit(1);
  }
}

module.exports = config;
