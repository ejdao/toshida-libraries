import { Pipe, PipeTransform } from '@angular/core';
import * as lang from './lang';
import { TSD_PTRN_EMAIL, TSD_PTRN_NUMRC } from '../common';

@Pipe({ name: 'errorMsg' })
export class TsdErrorMsgPipe implements PipeTransform {
  transform(parameter: string, aditionalValue?: any): string {
    let resources = lang.es;
    if (aditionalValue) {
      if (aditionalValue.requiredPattern) {
        const requiredPattern = aditionalValue.requiredPattern;
        if (requiredPattern === TSD_PTRN_EMAIL) return resources['EmailMsg'];
        else if (requiredPattern === `${TSD_PTRN_NUMRC}`) return resources['onlyNumberMsg'];
        else return resources[parameter];
      } else return resources[parameter](aditionalValue);
    } else return resources[parameter];
  }
}
