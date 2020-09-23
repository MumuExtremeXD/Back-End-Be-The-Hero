exports.up = function (knex) {
  return knex.schema.createTable('incidents', function (table) {
    // cria uma chave primária auto incremento
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    // Criando o relacionamento entre tabelas

    table.string('ong_id').notNullable();

    table.foreign('ong_id').references('id').inTable('ongs');
  })
};

exports.down = function (knex) {
  knex.schema.dropTable('incidents');
};
