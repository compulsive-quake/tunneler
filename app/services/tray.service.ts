import {app, Menu, Tray} from "electron";
import BrowserWindow = Electron.BrowserWindow;
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;

let tunnelsEnabled = true;
let browserWindow: BrowserWindow;

let menuItems: MenuItemConstructorOptions[] = [
  {
    label: tunnelsEnabled ? 'Tunnels Enabled': 'Tunnels Disabled',
    type: 'checkbox',
    checked: tunnelsEnabled,
    click: toggleTunnelsEnabled,
  },
  {
    label: 'Show Tunneler',
    click: ()=> browserWindow.show(),
  },
  {
    label: 'Quit',
    click: () => app.quit(),
  },
];

let tray;
let menu;

export async function initTray(win: BrowserWindow) {
  browserWindow = win;
  tray = new Tray('./icon.png');

  menu = Menu.buildFromTemplate(menuItems);

  tray.on('click', ()=> win.show());

  tray.setContextMenu(menu);
}

export async function toggleTunnelsEnabled(event) {

  tunnelsEnabled = !tunnelsEnabled;
  menuItems[0].label = tunnelsEnabled ? 'Tunnels Enabled': 'Tunnels Disabled';
  menuItems[0].checked = tunnelsEnabled;
  menu = Menu.buildFromTemplate(menuItems);
  tray.setContextMenu(menu);
}
