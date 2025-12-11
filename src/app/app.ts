import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminDashboardComponent } from './layouts/dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminDashboardComponent],
  templateUrl: './app.html',
})
export class App {}
