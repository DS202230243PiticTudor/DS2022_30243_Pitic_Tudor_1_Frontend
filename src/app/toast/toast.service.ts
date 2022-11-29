import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastComponent} from "./toast.component";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  showToast(dsiplayMessage: string, messageType: 'error' | 'warning' | 'info') {
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        message: dsiplayMessage,
        type: messageType
      },
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: messageType
    });
  }
}
