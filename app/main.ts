import { app, BrowserWindow, Tray, Menu } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import {getConfig, initHandles, monitorPosition, initTray, checkMigrationHistory} from './services';

let win: BrowserWindow = null;

const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

async function createWindow() {
  await checkMigrationHistory();

  const config = await getConfig();

  win = new BrowserWindow({
    x: Number(config.windowX),
    y: Number(config.windowY),
    width:  Number(config.windowWidth),
    height: Number(config.windowHeight),
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: false,
    },
    icon:'./icon.png',
    autoHideMenuBar: true,
  });

  initHandles();
  initTray(win);
  monitorPosition(win);

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);

    win.loadURL('http://localhost:4200');

  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
       // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    win.loadURL(url.format({
      pathname: path.join(__dirname, pathIndex),
      protocol: 'file:',
      slashes: true
    }));
  }

}

try {

  app.disableHardwareAcceleration();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    //todo: check config for minimize to tray
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (win === null) { createWindow(); }
  });

} catch (e) {
  console.error(e);
}
