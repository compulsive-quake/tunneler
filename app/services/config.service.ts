import {db} from './knex.service';

export type ElectronConfig = {
  windowWidth: string;
  windowHeight: string;
  windowX: string;
  windowY: string;
}

export async function getConfig(): Promise<ElectronConfig> {
  let config: ElectronConfig = {
    windowWidth: '500',
    windowHeight: '700',
    windowX: '300',
    windowY: '300',
  };

  try {
    const results = await db('Settings').select('*');

    if (!results.length) {
      const seedInserts = Object.keys(config).map(title => {
        return {title: title, setting: config[title]};
      })
      const seedResults = await db('settings').insert(seedInserts);
    }

    results.forEach(result => {
      config[result.title] = result.setting;
    });

  } catch (e) {
    throw new Error(e);
  }
  if (!config) {
    throw new Error('Failed to get config from DB');
  }

  return config;
}
