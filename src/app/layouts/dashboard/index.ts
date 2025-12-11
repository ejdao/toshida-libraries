import { Component, signal, effect, ViewEncapsulation } from '@angular/core';
import { DashboardContentComponent } from './content';
import { HeaderComponent } from './header';
import { SidebarComponent } from './sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, DashboardContentComponent],
  template: `
    <div
      class="app-container"
      [class.sidebar-collapsed]="sidebarCollapsed()"
      [class.light-mode]="isDarkMode() === false"
    >
      <app-sidebar
        [collapsed]="sidebarCollapsed"
        (toggle)="toggleSidebar()"
        [isDarkMode]="isDarkMode"
      />
      <div class="main-wrapper">
        <app-header
          (toggleMenu)="toggleSidebar()"
          [isDarkMode]="isDarkMode"
          (toggleTheme)="toggleTheme()"
        />
        <app-dashboard-content />
      </div>
    </div>
  `,
  styleUrl: './styles.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AdminDashboardComponent {
  sidebarCollapsed = signal(false);
  isDarkMode = signal(true);

  constructor() {
    effect(() => {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      this.isDarkMode.set(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    });
  }

  toggleSidebar() {
    this.sidebarCollapsed.update((v) => !v);
  }

  toggleTheme() {
    this.isDarkMode.update((v) => !v);
    const newTheme = this.isDarkMode() ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }
}
