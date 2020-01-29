exports.up = function(knex) {
  return knex.schema.createTable("users", t => {
    t.increments();
    t.string("uid", 255)
      .unique()
      .notNullable();
    t.string("email", 255)
      .unique()
      .notNullable();
    t.string("displayname", 255).unique();
    t.stirng("firstname", 255);
    t.string("lastname", 255);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
