const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { email, password } = req.body;
    console.log("test", email);
    db.query(`SELECT * FROM users WHERE email = $1`, [email])
      .then((data) => {
        const user = data.rows[0];
        if (!user) {
          return res.status(400).json({ message: "email not found" });
        }
        if (user.password !== password) {
          return res.status(400).json({ message: "Wrong password" });
        }

        req.session.user_id = user.id;
        return res.status(200).send({ ...user });
      })
      .catch((err) => res.status(500).send({ err }));
  });

  router.get("/me", (req, res) => {
    const user_id = req.session.user_id;
    db.query(`SELECT * FROM users WHERE id = $1`, [user_id])
    .then((data) => {
      const user = data.rows[0]

      if (!user) {
        return res.status(400).send({message: "user not found on database"})
      }

      return res.status(200).send({...user})
    })
    .catch(err => 
      res.status(500).send({error: err.message}))
  });

  return router;
};
