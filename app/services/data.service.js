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
exports.testTunnels = exports.getTunnels = exports.deleteProxy = exports.addProxy = exports.getProxies = exports.addHost = exports.getHosts = exports.initHandles = void 0;
const knex_service_1 = require("./knex.service");
const electron_1 = require("electron");
function initHandles() {
    electron_1.ipcMain.handle('getHosts', getHosts);
    electron_1.ipcMain.handle('addHost', addHost);
    electron_1.ipcMain.handle('getProxies', getProxies);
    electron_1.ipcMain.handle('addProxy', addProxy);
    electron_1.ipcMain.handle('getTunnels', getTunnels);
    electron_1.ipcMain.handle('testTunnel', testTunnels);
}
exports.initHandles = initHandles;
function getHosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield (0, knex_service_1.db)('Hosts').select('*');
        return results;
    });
}
exports.getHosts = getHosts;
function addHost(event, host) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, knex_service_1.db)('Hosts').insert(host);
        return result;
    });
}
exports.addHost = addHost;
function getProxies() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield (0, knex_service_1.db)('Proxies').select('*');
        return results;
    });
}
exports.getProxies = getProxies;
function addProxy(event, proxy) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, knex_service_1.db)('Proxies').insert(proxy);
        //todo: catch errors and log to file
        return result;
    });
}
exports.addProxy = addProxy;
function deleteProxy(event, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, knex_service_1.db)('Proxies').where('id', id).del();
        //todo: catch errors and log to file
        return result;
    });
}
exports.deleteProxy = deleteProxy;
function getTunnels() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield (0, knex_service_1.db)('Tunnels').select('*');
        return { tunnels: results, count: results.length };
    });
}
exports.getTunnels = getTunnels;
function testTunnels(event, tunnel) {
    return __awaiter(this, void 0, void 0, function* () {
        // await new Promise(resolve=>setTimeout(resolve, 6000));
        throw new Error('failed successfully');
        // const results: Tunnel[] = await db('Tunnels').select('*');
        // return { success: true, log };
    });
}
exports.testTunnels = testTunnels;
//# sourceMappingURL=data.service.js.map