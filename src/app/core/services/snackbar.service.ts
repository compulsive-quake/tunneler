import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  public open(message: string, action?: string, duration: number = 5000) {
    this.snackBar.dismiss();
    this.snackBar.open(message, action, { duration });
  }

  public dismiss() {
    this.snackBar.dismiss();
  }

}
