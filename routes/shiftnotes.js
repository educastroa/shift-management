const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { user_id, notes } = req.body;
    const date = new Date();
    db.query(
      `INSERT INTO shiftnotes
      (user_id, notes, date_created) VALUES ($1, $2, $3) RETURNING id;
      `,
      [user_id, notes, date]
    )
      .then((data) =>
        db.query(`SELECT * FROM shiftnotes WHERE id = $1;`, [data.rows[0].id])
      )
      .then((data) => res.status(200).send({ ...data.rows[0] }))
      .catch((err) => res.status(500).send({ err }));
  });

  router.get("/currentnotes", (req, res) => {
    const user_id = req.session.user_id;
    const date = new Date();
    date.setHours(date.getHours() - 8);

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

  router.delete("/deletenote/:id", (req, res) => {
    const id = req.params.id;

    db.query(`DELETE FROM shiftnotes WHERE id = $1;`, [id])
      .then(() => {
        return res.status(200).send({ message: "Delete successful" });
      })
      .catch((err) => {
        return res.status(500).send({ err });
      });
  });

  return router;
};
