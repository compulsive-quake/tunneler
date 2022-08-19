import {Component} from '@angular/core';
import {ElectronService} from './core/services';
import {TranslateService} from '@ngx-translate/core';
import {Dialog} from '@angular/cdk/dialog';
import {DialogAddTunnelComponent} from './dialog-add-tunnel/dialog-add-tunnel.component';
import {Router} from '@angular/router';

export interface AddTunnelDialogData {
  id?: number;
  title?: string;
  localPort?: number;
  remotePort?: number;
  host?: number;
  group?: number;
  proxy?: number;
}

export interface Host {
  id?: number;
  title: string;
  host: string;
}

export interface Proxy {
  id?: number;
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    public dialog: Dialog,
    public router: Router,
  ) {

    this.translate.setDefaultLang('en');
    // console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      // console.log(process.env);
      // console.log('Run in electron');
      // console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      // console.log('NodeJS childProcess', this.electronService.childProcess);
      this.electronService.ipcRenderer.on('logs', this.logHandler);
    } else {
      // console.log('Run in browser');
    }
  }

  public addTunnel(): void {
    const dialogRef = this.dialog.open<string>(DialogAddTunnelComponent, {
      minWidth: 512,
      // maxWidth: 600,
      panelClass: 'dialog-add-tunnel',
    });

    dialogRef.closed.subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  public async newProxy(): Promise<void> {
    await this.router.navigate(['proxy/new']);
  }

  private logHandler = (socket, log) => {
    console.log(log);
  };
}
