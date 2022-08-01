import { db } from './knex.service';
import { ipcMain } from 'electron';

export interface Host {
  id: number;
  title: string;
  host: string;
}

export interface Proxy {
  id: number;
  title: string;
  host: string;
  port: string;
}

export interface Tunnel {
  id: number;
  title: string;
  localPort: number;
  remotePort: number;
  host: number;
  group: number;
  proxy: number;
}

export function initHandles(): void {
  ipcMain.handle('getHosts', getHosts);
  ipcMain.handle('addHosts', addHost);
  ipcMain.handle('getProxies', getProxies);
  ipcMain.handle('addProxy', addProxy);
  ipcMain.handle('getTunnels', getTunnels);
}

export async function getHosts() {
  const results: Host[] = await db('Hosts').select('*');

  return { hosts: results, count: results.length };
}

export async function addHost(event, host: Host) {
  const result: Host[] = await db('Hosts').insert(host);

  return result;
}

export async function getProxies() {
  const results: Proxy[] = await db('Proxies').select('*');

  return results;
}

export async function addProxy(event, proxy: Proxy) {

  const result: Host[] = await db('Proxies').insert(proxy);
  //todo: catch errors and log to file
  return result;
}

export async function getTunnels() {
  const results: Tunnel[] = await db('Tunnels').select('*');

  return { tunnels: results, count: results.length };
}
