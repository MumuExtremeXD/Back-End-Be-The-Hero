const knex = require('../database');

module.exports = {
  async index(req, res) {
    //Valor default
    const { page = 1 } = req.query;

    const [count] = await knex('incidents').count();

    const incidents = await knex('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    // Enviando dados através do cabeçalho
    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);

  },

  async create(req, res) {

    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    // Por ser apenas um insert, essa promise vai retornar um array
    // A primeira chave desse array vai ser armazenado em uma variável id
    const [id] = await knex('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return res.json({ id });
  },

  async delete(req, res) {

    const { id } = req.params;
    const ong_id = req.headers.authorization;

    // Esse select vai trazer apenas a coluna ong_id
    // Fist é utilizado para retornar apenas um resultado, sem ele retornaria um array

    const incident = await knex('incidents').where('id', id).select('ong_id').first();

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not permitted.' })
    }

    await knex('incidents').where('id', id).delete();

    return res.status(204).send();
  },

}