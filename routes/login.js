const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (res, req) => {
    const { email, password } = req.body;
    db.query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((data) => {
      console.log(data);
    })
  });
};
