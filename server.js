require("dotenv").config();

const cookieSession = require("cookie-session");
const express = require("express");
const app = express();
const port = 8000;

const { Pool } = require("pg");
const { cookie } = require("request");
const dbParams = require("./lib/db");
const db = new Pool(dbParams);
db.connect()
  .then(() => {
    console.log(`Connect to ${dbParams.database} database`);
  })
  .catch((err) =>
    console.log(`This error occured while trying to connect to db: ${err}`)
  );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
const loginRoute = require("./routes/login");

app.use("/api/login", loginRoute(db));

app.listen(port, () => {
  console.log(`Server running at port:${port}`);
});
