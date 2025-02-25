import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  readonly snackBar = inject(MatSnackBar);

  showNotification(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
