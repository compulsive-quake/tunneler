import {Knex} from 'knex';

export async function up(knex: Knex) {

  // Groups
  await knex.schema.createTable('Groups', table => {

    table.increments('id').primary();
    table.string('title').primary();
    table.boolean('enabled').defaultTo(true);

  });

  // Hosts
  await knex.schema.createTable('Hosts', table => {

    table.increments('id').primary();
    table.string('title');
    table.string('host');

  });

  // Proxies
  await knex.schema.createTable('Proxies', table => {

    table.increments('id').primary();
    table.string('title');
    table.string('host');
    table.string('port');

  });

  // Tunnels
  await knex.schema.createTable('Tunnels', table => {

    table.increments('id').primary();
    table.string('title');
    table.tinyint('localPort');
    table.tinyint('remotePort');
    table.integer('host').references('id').inTable('hosts');
    table.integer('group').references('id').inTable('groups');
    table.integer('proxy').references('id').inTable('proxies');

  });

  // Settings
  await knex.schema.createTable('Settings', table => {

    table.increments('id').primary();
    table.string('title');
    table.string('setting');

  });

  // Logs
  await knex.schema.createTable('Logs', table => {

    table.increments('id').primary();
    table.string('entry');
    table.integer('tunnel').references('id').inTable('Tunnels');
    table.timestamps();

  });

}

export function down(_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.');
}
