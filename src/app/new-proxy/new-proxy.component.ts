import { Component, OnInit } from '@angular/core';
import {Proxy} from '../app.component';
import {ElectronService} from '../core/services';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-proxy',
  templateUrl: './new-proxy.component.html',
  styleUrls: ['./new-proxy.component.scss']
})
export class NewProxyComponent implements OnInit {

  title = new FormControl('', []);
  host = new FormControl('', [Validators.required]);
  port = new FormControl('', [Validators.max(65535)]);
  identity = new FormControl('', []);

  testing = false;
  testingResult: boolean | undefined;
  testingTimer = 100;
  testingError: Error | undefined;

  constructor(public es: ElectronService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  getProxy() {
    return {
      title: this.title.value,
      host: this.host.value,
      port: this.port.value,
      identity: this.identity.value,
    };
  }

  public async addProxy() {

    const result = await this.es.ipcRenderer.invoke('addProxy', this.getProxy());
    if (result) {
      console.log(result);
    }
  }

  public async testProxy() {

    const cancel = (err?: Error) => {
      this.testing = false;

      if (err) {
        this.testingError = err;
      }
    };

    const timeout = setTimeout(()=>{
      cancel(new Error('timed out waiting for Hosts'));
    }, 10000);

    this.testing = true;
    this.testingTimer = 100;
    this.testingResult = undefined;
    this.testingError = undefined;

    try {
      this.testingResult = await this.es.ipcRenderer.invoke('testProxy', this.getProxy);
      cancel();
    } catch (e) {
      cancel(e);
    }
  }

  public cancelAddProxy() {
    const lastRoute = this.route;

    console.log(lastRoute);
    // this.router.navigate();
  }

  public getPortError() {
    if (this.port.hasError('required')) {
      return 'You must enter a value';
    }

    return this.port.hasError('max') ? 'TCP port number must be 65535 or less' : '';
  }

  public onFileSelected(event) {
    console.log(event.target.files[0].src);
    // if(event.target.files.length > 0)
    // {
    //   console.log(event.target.files);
    // }
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log(inputNode);
        this.identity.patchValue(e.target.result);
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
