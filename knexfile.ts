require('ts-node/register');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'better-sqlite3',
  connection: {
    filename: './db.sqlite3'
  },
  useNullAsDefault: true,
};
