import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  config: MatSnackBarConfig<any>;

  constructor(private _snackBar: MatSnackBar) {
    this.config = new MatSnackBarConfig();
    this.config.duration = 5000;
    this.config.horizontalPosition = 'right';
    this.config.verticalPosition = 'top';
  }

  success(msg: string) {
    this.config.panelClass = ['alert-success']; 
    this._snackBar.open(msg, undefined, this.config);
  }

  warning(msg: string) {
    this.config.panelClass = ['alert-warning'];
    this._snackBar.open(msg, undefined, this.config);
  }

  info() {
    this.config.panelClass = ['alert-info'];
    this._snackBar.open('info', undefined, this.config);
  }

  error(msg: string) {
    this.config.panelClass = ['alert-error'];
    this._snackBar.open(msg, undefined, this.config);
  }
}
