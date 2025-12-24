import { Injectable } from '@angular/core';

export const LAYOUT_CONTAINER = 'tak__layout__container';

@Injectable({ providedIn: 'root' })
export class ToggleSidebar {
  public openSidebar(): void {
    try {
      document.getElementsByClassName(LAYOUT_CONTAINER)[0].classList.remove('compact');
      document.getElementsByClassName(LAYOUT_CONTAINER)[0].classList.add('full');
    } catch (error) {}
  }

  public closeSidebar(): void {
    try {
      document.getElementsByClassName(LAYOUT_CONTAINER)[0].classList.add('compact');
      document.getElementsByClassName(LAYOUT_CONTAINER)[0].classList.remove('full');
    } catch (error) {}
  }

  public toggleMobile(isMobile: boolean): void {
    try {
      if (!isMobile)
        document.getElementsByClassName(LAYOUT_CONTAINER)[0].classList.remove('mobile');
      else document.getElementsByClassName(LAYOUT_CONTAINER)[0].classList.add('mobile');
    } catch (error) {}
  }

  public expansionButton(expand: boolean): void {
    try {
      if (!expand) {
        document.getElementsByClassName(LAYOUT_CONTAINER)[0].classList.add('expand');
        document.getElementsByClassName('tak__container')[0].classList.add('sidebar-fixed');
      } else {
        document.getElementsByClassName(LAYOUT_CONTAINER)[0].classList.remove('expand');
        document.getElementsByClassName('tak__container')[0].classList.remove('sidebar-fixed');
      }
    } catch (error) {}
  }
}
