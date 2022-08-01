import {db} from './knex.service'

type Settings = {
  windowWidth?: number;
  windowHeight?: number;
  windowX?: number;
  windowY?: number;
}

export async function updateSettings(settings: Settings) {

  Object.keys(settings).forEach(async function eachKey(key) {
    await db('Settings')
      .update('setting', settings[key])
      .where('title', key);
  });

}

export function monitorPosition(win) {

  const updatePosition = async () => {
    const bounds = win.getBounds();

    await updateSettings({
      windowWidth: bounds.width,
      windowHeight: bounds.height,
      windowX: bounds.x,
      windowY: bounds.y
    });
  }

  win.on('minimize', (event)=> {
    event.preventDefault();
    win.hide();
  });

  win.on('resized', updatePosition);
  win.on('moved', updatePosition);

  win.on('closed', (event) => {
    event.preventDefault();
    win.hide();
    // win = null;
  });

}
