require("dotenv").config();

const express = require("express");
const app = express();
const port = 8000;


const { Pool } = require("pg");
const dbParams = require("./lib/db");
const db = new Pool(dbParams);
db.connect()
  .then(() => {
    console.log(`Connect to ${dbParams.database} database`);
  })
  .catch((err) => console.log(`This error occured while trying to connect to db: ${err}`));

app.use(express.urlencoded({ extended: true }));  
app.use(express.json())

const loginRoute = require("./routes/login");

app.use("/api/login", loginRoute(db));

app.listen(port, () => {
  console.log(`Server running at port:${port}`);
});
