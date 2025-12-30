import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@toshida/material/snack-bar';

export type TsdToastType = 'notification' | 'danger' | 'success';

export interface TsdToastConfig {
  hasDissmissButton?: boolean;
  dissmissButtonMessage?: string;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class TsdToastService {
  constructor(private _snackBar: MatSnackBar) {}

  public notification(message: string, payload: TsdToastConfig = {}): void {
    this._generateToast(message, 'notification', this._managePayload(payload));
  }

  public success(message: string, payload: TsdToastConfig = {}): void {
    this._generateToast(message, 'success', this._managePayload(payload));
  }
  public danger(message: string, payload: TsdToastConfig = {}): void {
    this._generateToast(message, 'danger', this._managePayload(payload));
  }

  private _generateToast(message: string, type: TsdToastType, payload: TsdToastConfig) {
    const {
      duration,
      verticalPosition,
      horizontalPosition,
      hasDissmissButton,
      dissmissButtonMessage,
    } = payload;

    this._snackBar.open(message, `${hasDissmissButton ? dissmissButtonMessage : ''}`, {
      duration,
      verticalPosition,
      horizontalPosition,
      panelClass: `tsd-snackbar--${type}`,
    });
  }

  private _managePayload(payload: TsdToastConfig): TsdToastConfig {
    return {
      hasDissmissButton: payload.hasDissmissButton || true,
      duration: payload.duration || 5000,
      dissmissButtonMessage: payload.dissmissButtonMessage || 'Cerrar',
      horizontalPosition: payload.horizontalPosition || 'center',
      verticalPosition: payload.verticalPosition || 'bottom',
    };
  }
}
