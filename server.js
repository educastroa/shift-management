require("dotenv").config;

const express = require("express");
const server = express();
const port = 8000;

const { Pool } = require("pg");
const dbParams = require("./lib/db");
const db = new Pool(dbParams);
db.connect()
  .then(() => {
    console.log(`Connect to ${dbParams.database} database`);
  })
  .catch(() => console.log("Error while connecting the DB"));





server.listen(port, () => {
  console.log(`Server running at port:${port}`);
});
