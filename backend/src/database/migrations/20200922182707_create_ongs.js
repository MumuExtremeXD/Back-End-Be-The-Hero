exports.up = function (knex) {
  return knex.schema.createTable('ongs', function (table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    // O segundo parâmetro de UF, é referente ao tamanho do texto que será armazenado no campo
    table.string('uf', 2).notNullable();
  });
};

exports.down = function (knex) {
  knex.schema.dropTable('ongs');
};
