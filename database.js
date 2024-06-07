// const sqlite3 = require("sqlite3");

// const db = new sqlite3.Database(":memory");

// db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS User (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         username VARCHAR(50) NOT NULL UNIQUE,
//         password VARCHAR(100) NOT NULL
//     );
//     CREATE TABLE IF NOT EXISTS Customer (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(100) NOT NULL UNIQUE,
//         number VARCHAR(20) NOT NULL UNIQUE,
//         gender ENUM('male', 'female') NOT NULL,
//         dob DATE NOT NULL
//     );
//     `);
// });

// module.exports = db;

const sqlite3 = require("sqlite3");

const db = new sqlite3.Database(":memory");
db.serialize(() => {
  db.run(
    `
      CREATE TABLE IF NOT EXISTS User (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username VARCHAR(50) NOT NULL UNIQUE,
          password VARCHAR(100) NOT NULL
      );
    `,
    (err) => {
      if (err) {
        console.error("Error creating User table:", err.message);
      } else {
        console.log("User table created or already exists.");
      }
    }
  );

  db.run(
    `
      CREATE TABLE IF NOT EXISTS Customer (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(100) NOT NULL UNIQUE,
          number VARCHAR(20) NOT NULL UNIQUE,
          gender VARCHAR(6) CHECK(gender IN ('male', 'female')) NOT NULL,
          dob DATE NOT NULL
      );
    `,
    (err) => {
      if (err) {
        console.error("Error creating Customer table:", err.message);
      } else {
        console.log("Customer table created or already exists.");
      }
    }
  );
});
module.exports = db;
// h
