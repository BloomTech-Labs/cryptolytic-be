// this file is the data access layer
const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
};

function find() {
  return db.select('*').from('users');
  // return db('users');
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
