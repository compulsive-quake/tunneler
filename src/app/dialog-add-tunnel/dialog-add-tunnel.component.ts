import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { AddTunnelDialogData, Host, Proxy } from '../app.component';
import { ElectronService, SnackbarService } from '../core/services';
import {BehaviorSubject} from 'rxjs';

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
    title: null,
    localPort: null,
    remotePort: null,
    proxy: null,
    host: null,
    group: null,
  };

  submittingTunnel = false;
  testingTunnel = false;
  testingTimer = 100;

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

    const cancel = (err?: Error, msg?: string): void => {
      clearTimeout(timeout);
      this.loadingHosts = false;
      if (err) {
        console.error(err);
        this.sb.error(msg ? msg : err.message, 'error');
      }
    };

    const timeout = setTimeout(()=>{
      cancel(new Error('timed out waiting for Hosts'));
    }, 10000);

    try {
      const results: Host[] = await this.es.ipcRenderer.invoke('getHosts');

      if (results && results.length) {
        results.forEach(result => this.hosts.push(result));
      } else {
        this.showAddHost = true;
      }

      cancel();
    } catch (e) {
      cancel(e, 'Error getting Hosts');
    }
  }

  public async getProxies() {
    this.loadingProxies = true;

    const timeout = setTimeout(()=>{
      this.loadingProxies = false;
      throw new Error('timed out submitting tunnel');
    }, 10000);

    const cancel = (err?: Error, msg?: string) => {
      this.loadingProxies = false;
      clearTimeout(timeout);
      if (err) {
        console.error(err);
        this.sb.error(msg ? msg : err.message);
      }
    };

    try {
      const results: Proxy[] = await this.es.ipcRenderer.invoke('getProxies');

      if (results && results.length) {
        results.forEach(result => this.proxies.push(result));
      } else {
        this.showAddProxy = true;
      }

      cancel();
    } catch (err) {
      cancel(err, 'Error getting proxies');
    }
  }



  public async submitTunnel(): Promise<void> {
    this.submittingTunnel = true;

    const timeout = setTimeout(()=>{
      cancel(new Error('timed out submitting tunnel'));
    }, 10000);

    const cancel = (err?: Error, msg?: string) => {
      this.submittingTunnel = true;
      clearTimeout(timeout);
      if (err) {
        console.error(err);
        this.sb.error(msg ? msg : err.message);
      }
    };

    try {
      await this.es.ipcRenderer.invoke('addTunnel', this.newTunnel);
      cancel();
      this.dialogRef.close();
    } catch (err) {
      cancel(err, 'Error adding tunnel');
    }
  }

  testProxy() {

  }

  public async addHost() {
    const result = await this.es.ipcRenderer.invoke('addHost', this.newHost);
    if (result) {
      this.hosts.push({id: result, ...this.newHost});
      this.newTunnel.host = result;
      this.showAddHost = false;
      this.newHost = {
        title: null,
        host: null,
      };
    }
  }

  public submitDisabled() {
    return (
      !this.newTunnel.title ||
      !this.newTunnel.host ||
      !this.newTunnel.proxy ||
      !this.newTunnel.remotePort ||
      !this.newTunnel.localPort
    );
  }

  public async testTunnel() {

    this.testingTunnel = true;
    this.testingTimer = 100;

    const interval = setInterval(()=>{
      this.testingTimer -= 1;
    }, 100);

    //todo: customize timeout with settingsService
    const timeout = setTimeout(()=>{
      cancel(new Error('timed out testing tunnel'));
    }, 10000);

    const cancel = (err?: Error, msg?: string) => {
      this.testingTunnel = false;
      clearInterval(interval);
      clearTimeout(timeout);
      if (err) {
        console.error(err);
        this.sb.error(msg ? msg : err.message);
      }
    };

    try {
      await this.es.ipcRenderer.invoke('testTunnel', this.newTunnel);
    } catch (err) {
      cancel(err, 'Tunnel connection failed');
    }
  }

  cancelAddProxy() {
    this.showAddProxy = false;
  }
}
