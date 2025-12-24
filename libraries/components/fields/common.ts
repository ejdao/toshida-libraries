import { ESCAPE } from '@toshida/cdk/keycodes';
import { ThemePalette } from '@toshida/material/core';
import { FloatLabelType, MatFormFieldAppearance } from '@toshida/material/form-field';

export type TsdTextFieldType = 'text' | 'password';
export type TsdAutocompleteFieldType = 'off' | 'on';

export const TSD_DEFAULT_APPEARANCE_FORM: MatFormFieldAppearance = 'fill';

export const TSD_FIELDS_PRESS_ESC_KEY = new KeyboardEvent('keydown', {
  bubbles: true,
  cancelable: true,
  keyCode: ESCAPE,
});

export const TSD_PTRN_EMAIL = '^[^@]+@[^@]+.[a-zA-Z]{2,}$';
export const TSD_PTRN_NUMRC = /^[0-9.]+$/;

export interface TsdConfigFieldI {
  hasActionButton?: boolean;
  hasClearButton?: boolean;
  actionIcon?: string;
  countCaracters?: boolean;
  minLength?: number;
  maxLength?: number;
  appearance?: MatFormFieldAppearance;
  autocomplete?: TsdAutocompleteFieldType;
  floatLabel?: FloatLabelType;
  isHidden?: boolean;
  showHiddenButton?: boolean;
  emitOnKeyUp?: boolean;
  color?: ThemePalette;
}

export interface TsdConfigAutoCompleteFieldI extends TsdConfigFieldI {
  url?: string;
  params?: any;
  complementType?: 1 | 2;
  complement?: string;
  value?: string;
  justSearchOneTime?: boolean;
  hasDefaultValue?: boolean;
}
