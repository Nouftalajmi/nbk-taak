const express = require("express");
const CustomerController = require("../customers/controllers");
const passport = require("passport");
const customrsRouter = express.Router();
customrsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  CustomerController.createCustomer
);

customrsRouter.put(
  "/:customerId",
  passport.authenticate("jwt", { session: false }),
  CustomerController.updateCustomer
);

customrsRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  CustomerController.getCustomers
);

customrsRouter.get(
  "/:customerId",
  passport.authenticate("jwt", { session: false }),
  CustomerController.getCustomerById
);

module.exports = customrsRouter;
