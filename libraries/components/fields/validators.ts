import { Validators } from '@angular/forms';
import { TSD_PTRN_EMAIL, TSD_PTRN_NONSP, TSD_PTRN_NUMRC } from './common';

export const required = Validators.required;

export const max = (max: number) => Validators.max(max);
export const min = (min: number) => Validators.min(min);

export const maxLength = (maxLength: number) => Validators.maxLength(maxLength);
export const minLength = (minLength: number) => Validators.minLength(minLength);

export const withOutSpaces = Validators.pattern(TSD_PTRN_NONSP);
export const onlyNumber = Validators.pattern(TSD_PTRN_NUMRC);
export const email = Validators.pattern(TSD_PTRN_EMAIL);
