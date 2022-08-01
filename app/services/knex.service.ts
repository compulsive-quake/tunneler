import knex, {Knex} from 'knex';
const config = require('../../knexfile');

export const db: Knex = knex(config);

/**
 * apply the latest migration files to db
 */
export async function migrate() {
  try {
    const migrateResults = await db.migrate.latest();
    console.log(`migration: ${migrateResults}`);
  } catch (err) {
    //todo: log errors to file
    console.error(`Error migrating:`, err);
  }
}

/**
 * apply the latest migration files to db
 */
export async function seed() {
  try {
    const seedResults = await db.seed.run();
    console.log(`seeding: ${seedResults}`);
  } catch (err) {
    //todo: log errors to file
    console.error('Error seeding: ', err);
  }
}
