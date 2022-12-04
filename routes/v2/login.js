const express = require("express");
const routes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../connection/data");
const userMiddleware = require("../../middlewares/user");
const loginController = require("../../handlers/v2/login");
routes.post("/register", userMiddleware.validateRegister, (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = {
      username: req.body.username,
      password: hash,
    };
    db.query("INSERT INTO users SET ?", user, (err, result) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      res.status(201).json({
        message: "User created!",
      });
    });
  });
});
routes.post("/login", loginController.login);
module.exports = routes;
