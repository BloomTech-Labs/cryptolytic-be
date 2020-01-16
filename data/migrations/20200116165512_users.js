
exports.up = function(knex) {
    return knex.schema
    .createTable('users', t => {
        t.increments('user_id')
        t.string('username', 255)
        .notNullable().unique()
        t.string('password', 255).notNullable()
    })
  
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users');
  
};
