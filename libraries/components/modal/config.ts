import { MatDialogConfig } from '@toshida/material/dialog';

export type TsdModalType = 'confirm' | 'alert';

export interface TsdModalConfig {
  confirmButton?: string;
  deniedButton?: string;
  okButton?: string;
  hasTopCloseButton?: boolean;
  dialogOptions?: MatDialogConfig;
}
