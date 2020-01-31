// this file is the data access layer
const db = require("../data/db-config.js");

module.exports = {
  find,
  findByUid,
  add
};

function find() {
  return db.select("*").from("users");
  // return db('users');
}

function findByUid(uid) {
  console.log("model uid", uid, typeof uid);
  return db("users")
    .where({ uid })
    .first();
}

function add(data) {
  console.log("user-model", data);
  return db("users").insert(data);
}
