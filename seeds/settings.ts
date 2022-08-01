import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('Settings').del();

    // Inserts seed entries
    await knex('Settings').insert([
        { title: 'windowWidth', setting: '1280' },
        { title: 'windowHeight', setting: '720' },
        { title: 'windowX', setting: '300' },
        { title: 'windowY', setting: '300' },
    ]);
}
