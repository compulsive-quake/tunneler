import {db} from './knex.service'

interface Bounds {
  windowWidth?: number;
  windowHeight?: number;
  windowX?: number;
  windowY?: number;
}

export async function updateSettings(bounds) {
  const existingSettings = await db('Settings').select('*');
  const boundArray = Object.keys(bounds);
  const toUpdate = [];
  const toInsert = [];

  const processSetting = async title => {
    const found = existingSettings.find(elem => {
      return elem.title === title;
    });
    const setting = bounds[title];

    if (found) {
      toUpdate.push({ title, setting });
    } else {
      toInsert.push({ title, setting});
    }
  }

  boundArray.forEach(processSetting);

  if (toUpdate.length) {
    toUpdate.forEach(async (update: any) => {
      await db('Settings').update(update).where('title', update.title);
    });
  }

  if (toInsert.length) {
    await db('Settings').insert(toInsert);
  }
}

export function monitorPosition(win) {

  const updatePosition = async () => {
    const bounds = win.getBounds();
    const payload = {
      windowWidth: bounds.width,
      windowHeight: bounds.height,
      windowX: bounds.x,
      windowY: bounds.y
    };

    await updateSettings(payload);
  }

  win.on('minimize', (event)=> {
    event.preventDefault();
    win.hide();
  });

  win.on('resized', updatePosition);
  win.on('moved', updatePosition);

  win.on('close', (event) => {
    // event.preventDefault();
    win.hide();
    // win = null;
  });

}
