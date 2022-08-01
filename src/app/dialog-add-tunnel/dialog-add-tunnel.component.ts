import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { AddTunnelDialogData, Host, Proxy } from '../app.component';
import { ElectronService, SnackbarService } from '../core/services';

@Component({
  selector: 'app-dialog-add-tunnel',
  templateUrl: 'dialog-add-tunnel.html',
  styleUrls: ['./dialog-add-tunnel.scss'],
})
export class DialogAddTunnelComponent {

  proxies: Proxy[] = [];
  newProxy: Proxy = {
    title: null,
    host: null,
    port: null
  };
  loadingProxies = false;
  showAddProxy = false;

  hosts: Host[] = [];
  newHost: Host = {
    title: null,
    host: null,
  };
  loadingHosts = false;
  showAddHost = false;

  newTunnel: AddTunnelDialogData = {
    proxy: null,
    host: null,
    localPort: null,
    remotePort: null,
  };
  submittingTunnel = false;

  constructor(
    public dialogRef: DialogRef<string>,
    public es: ElectronService,
    public sb: SnackbarService
  ) {
    this.getHosts();
    this.getProxies();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  async getHosts() {
    this.loadingHosts = true;

    const timeout = setTimeout(()=>{
      throw new Error('timed out submitting tunnel');
    }, 10000);

    try {
      this.hosts = await this.es.ipcRenderer.invoke('getHosts');
      clearTimeout(timeout);
    } catch (e) {
      clearTimeout(timeout);
      this.sb.open('Error getting hosts', 'close');
      console.error(e);
    }

  }

  public async getProxies() {
    this.loadingProxies = true;

    const timeout = setTimeout(()=>{
      this.loadingProxies = false;
      throw new Error('timed out submitting tunnel');
    }, 10000);

    const cancel = (err?: Error) => {
      this.loadingProxies = false;
      clearTimeout(timeout);
      if (err) {
        console.error(err);
      }
    };

    try {
      const results: Proxy[] = await this.es.ipcRenderer.invoke('getProxies');

      if (results && results.length) {
        results.forEach(result => this.proxies.push(result));
      }

      cancel();
    } catch (e) {
      cancel();
      this.sb.open('Error getting proxies', 'close');
    }
  }

  public async submit(): Promise<void> {
    this.submittingTunnel = true;

    const timeout = setTimeout(()=>{
      throw new Error('timed out submitting tunnel');
    }, 10000);

    const cancel = (err?: Error) => {
      this.loadingProxies = false;
      clearTimeout(timeout);
      if (err) {
        console.error(err);
      }
    };

    try {
      await this.es.ipcRenderer.invoke('addTunnel', this.newTunnel);
      cancel();
      this.dialogRef.close();
    } catch (err) {
      cancel(err);
      throw new Error('Error adding tunnel');
    }
  }

  public async addProxy() {
    const result = await this.es.ipcRenderer.invoke('addProxy', this.newProxy);
    if (result) {
      this.proxies.push({id: result, ...this.newProxy});
      this.newTunnel.proxy = result;
      this.newProxy = {
        title: null,
        host: null,
        port: null
      };
    }
  }

  testProxy() {

  }

  public async addHost() {
    await this.es.ipcRenderer.invoke('addHost', this.newHost);
  }
}
