import { Pipe, PipeTransform } from '@angular/core';

interface PayloadFromUser {
  context: any;
  authorities: any | any[];
}

interface PayloadFromSystem {
  authorities: any | any[];
  blockOnCtxs: any | any[];
}

@Pipe({ standalone: false, name: 'validateAccess' })
export class ValidateAccessPipe implements PipeTransform {
  transform(_valuesToCompare: any[], _user: any[]) {
    const valuesToCompare: PayloadFromSystem = {
      authorities: _valuesToCompare[0],
      blockOnCtxs: _valuesToCompare[1],
    };

    const user: PayloadFromUser = {
      context: _user[0],
      authorities: _user[1],
    };

    let contextIsValid = true;
    let permissionsIsValid = true;

    let authorities: any[] | undefined;
    let blockOnCtxs: any[] | undefined;
    let userAuthorities: any[] | undefined;
    let userContext: any = user.context;

    if (valuesToCompare.authorities) {
      authorities = Array.isArray(valuesToCompare.authorities)
        ? valuesToCompare.authorities
        : [valuesToCompare.authorities];
    }

    if (valuesToCompare.blockOnCtxs) {
      blockOnCtxs = Array.isArray(valuesToCompare.blockOnCtxs)
        ? valuesToCompare.blockOnCtxs
        : [valuesToCompare.blockOnCtxs];
    }

    if (user.authorities) {
      userAuthorities = Array.isArray(user.authorities) ? user.authorities : [user.authorities];
    }

    if (blockOnCtxs) if (userContext) contextIsValid = !(blockOnCtxs.indexOf(userContext) >= 0);

    if (authorities) {
      if (userAuthorities) {
        permissionsIsValid = false;

        userAuthorities.forEach((userAuthority) => {
          if (authorities!.indexOf(userAuthority) >= 0) permissionsIsValid = true;
        });
      }
    }

    return !(contextIsValid && permissionsIsValid);
  }
}
