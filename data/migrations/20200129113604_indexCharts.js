
exports.up = function(knex) {
    return knex.schema
    .createTable('indexCharts', t => {
        t.increments();
        t.string('name', 255).notNullable();
        t.integer('interval', 255).notNullable();
        t
        .integer('users_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('indexCharts')
};