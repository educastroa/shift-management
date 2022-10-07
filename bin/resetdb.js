require("dotenv").config();

const fs = require("fs");
const { Client } = require("pg");
const dbParams = require("../lib/db");
const db = new Client(dbParams);

const runSchemas = async () => {
  console.log("loading Schemas");
  const schemasFilesnames = fs.readdirSync("./db/schema");

  for (const fn of schemasFilesnames) {
    const sql = fs.readFileSync(`./db/schema/${fn}`, "utf8");
    console.log(`\t running ${fn}`);
    await db.query(sql);
  }
};

const runSeeds = async () => {
  console.log("Running seeds");
  const seedsFilesNames = fs.readdirSync("./db/seeds");

  for (fn of seedsFilesNames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, "utf8");
    console.log(`Running ${fn}`);
    await db.query(sql);
  }
};

const runDbReset = async () => {
  try {
    dbParams.host &&
      console.log(`Connecting to PG on ${dbParams.host} as ${dbParams.user}`);
    await db.connect();
    await runSchemas();
    await runSeeds();
    console.log('completed');
    db.end();
  } catch (err) {
    console.error(`Failed due to error ${err}`);
  }
};

runDbReset();
