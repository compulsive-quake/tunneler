import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MatSnackBarRef, MAT_SNACK_BAR_DATA, MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snackbar.html',
  styleUrls: ['./snackbar.scss']
})
export class SnackBarComponent {

  constructor(
    public sbRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
  ) {}

  public click() {
    this.sbRef.dismiss();
  }
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  snackBarRef: MatSnackBarRef<any>;

  constructor(
    private snackBar: MatSnackBar
  ) {}

  //todo: make undo snackbar
  public open(msg: string, icon: string = 'notice') {
    this.snackBar.dismiss();
    this.snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
      data: { msg, icon },
      duration: 7500,
      panelClass: ['info-snackbar'],
    });
  }

  public error(msg: string, icon: string = 'error') {
    this.snackBar.dismiss();

    this.snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
      data: { msg, icon },
      duration: 7500,
      panelClass: ['error-snackbar'],
    });

    // this.snackBarRef.containerInstance.
    this.snackBarRef.instance.on('click', (evt) => {
      console.log('clicked');
      console.log(evt);
    });
  }

  public dismiss() {
    this.snackBar.dismiss();
  }

}
