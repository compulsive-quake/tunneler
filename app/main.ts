import {app, BrowserWindow, Tray, Menu } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import {getConfig, initHandles} from './services';

let win: BrowserWindow = null;
let tray;
let isQuiting;

const tunnelsEnabled = true;

const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

app.disableHardwareAcceleration();

app.on('before-quit', function () {
  isQuiting = true;
});

async function createWindow() {
  const config = await getConfig();
  initHandles();

  tray = new Tray('./icon.png');
  tray.on('click', ()=> win.show());

  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: ()=> win.show(),
      checked: false,
    },
    {
     label: 'Quit', click: ()=> {
        isQuiting = true;
        app.quit();
      }
    },
    {
      label: 'Enable tunnels',
      type: 'checkbox',
      checked: tunnelsEnabled,
    }
  ]));

  // const size = screen.getPrimaryDisplay().workAreaSize;

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

  win.on('minimize', (event)=> {
    event.preventDefault();
    win.hide();
  });


  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);

    // ipcMain.on('set-title', handleSetTitle);

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

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null;
  });
}

try {
  app.on('ready', () => setTimeout(createWindow, 400));

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') { app.quit(); }
  });

  app.on('activate', () => {
    if (win === null) { createWindow(); }
  });

} catch (e) {
  console.error(e);
}
