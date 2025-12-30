import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminDashboardContainerComponent } from './layouts/admin';
import { TsdLayoutsMenuSection } from './layouts';
import { APP_NAVIGATION } from './app.navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminDashboardContainerComponent],
  templateUrl: './app.html',
})
export class App {
  menuSections = signal<TsdLayoutsMenuSection[]>(APP_NAVIGATION);
}
