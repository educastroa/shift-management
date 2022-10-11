const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { email, password } = req.body;
    db.query(`SELECT * FROM users WHERE email = $1`, [email])
      .then((data) => {
        if (
          data.rows[0].email === email &&
          data.rows[0].password === password
        ) {
          return res.sendStatus(200);
        }
      })
      .catch((err) => res.sendStatus(400).json({ err }));
  });
  return router;
};
