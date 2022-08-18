import knex, {Knex} from 'knex';
const config = require('../../knexfile');

export const db: Knex = knex(config);

/**
 * confirm that all migrations scripts have been run
 */
export async function checkMigrationHistory() {
  const results = await db.migrate.list();
  const [existing, files] = results;
  const migrationCount = files.length - existing.length;

  if (migrationCount) {
    await migrate();
  }
}

/**
 * confirm that all migrations scripts have been run
 */
export async function checkSeedHistory() {

}

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
