"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTunnelsEnabled = exports.initTray = void 0;
const electron_1 = require("electron");
let tunnelsEnabled = true;
let browserWindow;
let menuItems = [
    {
        label: tunnelsEnabled ? 'Tunnels Enabled' : 'Tunnels Disabled',
        type: 'checkbox',
        checked: tunnelsEnabled,
        click: toggleTunnelsEnabled,
    },
    {
        label: 'Show Tunneler',
        click: () => browserWindow.show(),
    },
    {
        label: 'Quit',
        click: () => electron_1.app.quit(),
    },
];
let tray;
let menu;
function initTray(win) {
    return __awaiter(this, void 0, void 0, function* () {
        browserWindow = win;
        tray = new electron_1.Tray('./icon.png');
        menu = electron_1.Menu.buildFromTemplate(menuItems);
        tray.on('click', () => win.show());
        tray.setContextMenu(menu);
    });
}
exports.initTray = initTray;
function toggleTunnelsEnabled(event) {
    return __awaiter(this, void 0, void 0, function* () {
        tunnelsEnabled = !tunnelsEnabled;
        menuItems[0].label = tunnelsEnabled ? 'Tunnels Enabled' : 'Tunnels Disabled';
        menuItems[0].checked = tunnelsEnabled;
        menu = electron_1.Menu.buildFromTemplate(menuItems);
        tray.setContextMenu(menu);
    });
}
exports.toggleTunnelsEnabled = toggleTunnelsEnabled;
//# sourceMappingURL=tray.service.js.map