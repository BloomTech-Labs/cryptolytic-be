
exports.up = function(knex) {
    return knex.schema
    .createTable('exchanges', t => {
        t.increments();
        t.string('name', 255).notNullable();
        t
        .integer('indexCharts_id')
        .unsigned()
        .references('id')
        .inTable('indexCharts')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('exchanges')
};
