const express = require("express");
const { DatabaseError } = require("pg");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { user_id, notes } = req.body;
    console.log(user_id, notes);
    const date = new Date();
    db.query(
      `INSERT INTO shiftnotes
      (user_id, notes, date_created) VALUES ($1, $2, $3);
      `,
      [user_id, notes, date]
    )
      .then((data) => {
        return res.status(200).send();
      })
      .catch((err) => {
        return res.status(500).send({ err });
      });
  });
  return router
};
