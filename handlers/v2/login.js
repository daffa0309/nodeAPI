const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../connection/data");
const userMiddleware = require("../../middlewares/user");
exports.login = async (req, res, next) => {
const user = await   db.query(
    "SELECT * FROM users WHERE username = ?",
    [req.body.username],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      if (result.length < 1) {
        return res.status(401).json({
          message: "Username or Password Doesnt Exist",
        });
      }
      bcrypt.compare(req.body.password, result[0].password, async(err, response) => {
        if (err) {
          return res.status(401).json({
            message: "Username or Password Doesnt Exist",
          });
        }
        if (response) {
          const token = jwt.sign(
            {
              username: result[0].username,
              userId: result[0].id,
            },
            "secret_this_should_be_longer",
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            userId: result[0].id,
            roleId: result[0].role_id,
          });
        }
        return res.status(401).json({
          message: "Auth Failed",
        });
      });
    }
  );
}


