const db = require("../../database");

// exports.createCustomer = async (req, res) => {
//   const { name, number, gender, dob } = req.body;
//   try {
//     db.run(
//       `INSERT INTO Customer (name, number, gender, dob) VALUES (?, ?, ?, ?)`,
//       [name, number, gender, dob],
//       function (err) {
//         if (err) {
//           console.error("Error creating customer:", err.message);
//           return res.status(500).json({ message: "Internal server error" });
//         }
//         const newCustomerId = this.lastID;
//         res.status(201).json({
//           id: newCustomerId,
//           message: "Customer created successfully",
//         });
//       }
//     );
//   } catch (error) {
//     console.error("Unexpected error:", error.message);
//     res.status(500).json({ message: "Unexpected server error" });
//   }
// };

exports.createCustomer = async (req, res) => {
  const { name, number, gender, dob } = req.body;

  // Validate input
  if (!name || !number || !gender || !dob) {
    return res
      .status(400)
      .json({ message: "All fields are required: name, number, gender, dob" });
  }

  try {
    db.run(
      `INSERT INTO Customer (name, number, gender, dob) VALUES (?, ?, ?, ?)`,
      [name, number, gender, dob],
      function (err) {
        if (err) {
          if (err.code === "SQLITE_CONSTRAINT") {
            console.error("Unique constraint error:", err.message);
            return res
              .status(400)
              .json({ message: "Customer name and number must be unique" });
          } else {
            console.error("Error creating customer:", err.message);
            return res.status(500).json({ message: "Internal server error" });
          }
        }
        const newCustomerId = this.lastID;
        res.status(201).json({
          id: newCustomerId,
          message: "Customer created successfully",
        });
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ message: "Unexpected server error" });
  }
};

exports.updateCustomer = async (req, res) => {
  const customerId = req.params.customerId;
  const { name, number, gender, dob } = req.body;
  try {
    db.run(
      `UPDATE Customer SET name = ?, number = ?, gender = ?, dob = ? WHERE id = ?`,
      [name, number, gender, dob, customerId],
      function (err) {
        if (err) {
          console.error("Error updating customer:", err.message);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.json({ message: "Customer updated successfully" });
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ message: "Unexpected server error" });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    db.all(`SELECT * FROM Customer`, [], (err, customers) => {
      if (err) {
        console.error("Error fetching customers:", err.message);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.json(customers);
    });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ message: "Unexpected server error" });
  }
};

exports.getCustomerById = async (req, res) => {
  const customerId = req.params.customerId;
  try {
    db.get(
      `SELECT * FROM Customer WHERE id = ?`,
      [customerId],
      (err, customer) => {
        if (err) {
          console.error("Error fetching customer:", err.message);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (!customer) {
          return res.status(404).json({ message: "Customer not found" });
        }
        res.json(customer);
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ message: "Unexpected server error" });
  }
};
