// this file is the data access layer
const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  add
};

function find() {
  return db.select("*").from("users");
  // return db('users');
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function add(data) {
  console.log("user-model", data);
  return db("users").insert(data);
}
