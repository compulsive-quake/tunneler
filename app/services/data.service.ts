import { db } from './knex.service';
import { ipcMain } from 'electron';

export interface Proxy {
  id: number;
  title: string;
  host: string;
  port: string;
}

export interface Host {
  id: number;
  title: string;
  host: string;
  user: string;
  password: string;
  key: string;
}

export interface Tunnel {
  id: number;
  title: string;
  localPort: number;
  remotePort: number;
  host: number;
  group: number;
  proxy: number;
  run: string;
}

export interface Log {
  id: number;
  entry: string;
  tunnel: number;
  createdAt: Date;
}

export function initHandles(): void {
  ipcMain.handle('getHosts', getHosts);
  ipcMain.handle('addHost', addHost);
  ipcMain.handle('getProxies', getProxies);
  ipcMain.handle('addProxy', addProxy);
  ipcMain.handle('getTunnels', getTunnels);
  ipcMain.handle('testTunnel', testTunnels);
}

export async function getHosts() {
  const results: Host[] = await db('Hosts').select('*');

  return results;
}

export async function addHost(event, host: Host) {
  const result: number = await db('Hosts').insert(host);

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

export async function deleteProxy(event, id: number) {

  const result: Host[] = await db('Proxies').where('id', id).del();
  //todo: catch errors and log to file
  return result;
}

export async function getTunnels() {
  const results: Tunnel[] = await db('Tunnels').select('*');

  return { tunnels: results, count: results.length };
}

export async function testTunnels(event, tunnel: Tunnel) {
  // await new Promise(resolve=>setTimeout(resolve, 6000));
  throw new Error('failed successfully');
  // const results: Tunnel[] = await db('Tunnels').select('*');

  // return { success: true, log };
}
