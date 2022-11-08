const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { user_id, notes } = req.body;
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

  router.get("/currentnotes", (req, res) => {
    const user_id = req.session.user_id;
    const date = new Date();
    date.setHours(date.getHours() - 8)
    
    db.query(
      `SELECT * FROM shiftnotes WHERE user_id = $1 AND date_created > $2;`,
      [user_id, date]
    )
      .then((data) => {
        return res.status(200).send(data.rows);
      })
      .catch((err) => {
        return res.status(500).send({ err });
      });
  });



  return router
};

