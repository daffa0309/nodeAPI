const express = require("express");

const router = express.Router();

const loginRoutes = require("./login");
const userRoutes = require("./user");
const menuRoutes = require("./menu");

/**
 * @TODO sort alphabetical ascending!
 */
router.use("/api/v2", [
  loginRoutes,
  userRoutes,
  menuRoutes
]);

module.exports = router;
