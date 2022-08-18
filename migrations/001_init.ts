import {Knex} from 'knex';

export async function up(knex: Knex) {

  await knex.schema.createTable('Groups', table => {

    table.increments('id').primary();
    table.string('title').primary();
    table.boolean('enabled').defaultTo(true);

  });

  await knex.schema.createTable('Hosts', table => {

    table.increments('id').primary();
    table.string('title');
    table.string('host');
    table.string('run').comment('command to run after tunnel opens');
    table.string('dir').comment('working directory of run command');

  });

  await knex.schema.createTable('HostTypes', table => {

    table.increments('id').primary();
    table.string('title');
    table.string('icon');

  });

  await knex.schema.createTable('Icons', table => {

    table.increments('id').primary();
    table.string('title');
    table.string('filePath');

  });

  await knex.schema.createTable('Proxies', table => {

    table.increments('id').primary();
    table.string('title');
    table.string('host');
    table.string('port');
    table.string('identityFile');

  });

  await knex.schema.createTable('Tunnels', table => {

    table.increments('id').primary();
    table.string('title');
    table.tinyint('localPort');
    table.tinyint('remotePort');
    table.integer('host').references('id').inTable('hosts');
    table.integer('group').references('id').inTable('groups');
    table.integer('proxy').references('id').inTable('proxies');

  });

  await knex.schema.createTable('Settings', table => {

    table.increments('id').primary();
    table.string('title');
    table.string('setting');

  });

  await knex.schema.createTable('Logs', table => {

    table.increments('id').primary();
    table.string('entry');
    table.integer('tunnel').references('id').inTable('Tunnels');
    table.timestamps();

  });

}

export function down(_knex: Knex) {
  throw new Error('Migration rollback not supported');
}
