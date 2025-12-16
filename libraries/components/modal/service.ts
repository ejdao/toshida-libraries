import { Injectable } from '@angular/core';
import { MatDialog } from '@toshida/material/dialog';
import { TsdModalComponent } from './component';
import { TsdModalConfig, TsdModalType } from './config';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TsdModalService {
  constructor(private dialog: MatDialog) {}

  public alert(content: string, title: string = '', options?: TsdModalConfig): Observable<boolean> {
    return this._generateDialog(content, title, 'alert', options);
  }

  public confirm(
    content: string,
    title: string = '',
    options?: TsdModalConfig,
  ): Observable<boolean> {
    return this._generateDialog(content, title, 'confirm', options);
  }

  private _generateDialog(
    content: string,
    title: string,
    type: TsdModalType,
    options?: TsdModalConfig,
  ) {
    const dialog = this.dialog.open(TsdModalComponent, {
      data: {
        content,
        title,
        options,
        type,
      },
    });
    return dialog.afterClosed();
  }
}
