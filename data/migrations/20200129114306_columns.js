
exports.up = function(knex) {
    return knex.schema
    .createTable('columns', t => {
        t.increments();
        t.string('name', 255).notNullable();
        t.integer('order').notNullable();
        t
        .integer('indexTables_id')
        .unsigned()
        .references('id')
        .inTable('indexTables')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('columns')
};
