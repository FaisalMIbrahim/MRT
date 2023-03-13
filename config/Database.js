import { Sequelize } from "sequelize";

const db = new Sequelize("bbzuaaeo1qw4zedptwbn", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
