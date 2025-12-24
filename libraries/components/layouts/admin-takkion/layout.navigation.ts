import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NavigationService {
  public iconMenu: any[] = [];
  public menuItems = new BehaviorSubject<any[]>(this.iconMenu);
  public menuItems$ = this.menuItems.asObservable();

  public publishNavigationChange(): void {
    this.menuItems.next(this.iconMenu);
  }
}
