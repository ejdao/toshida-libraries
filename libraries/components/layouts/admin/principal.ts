import { Component, signal, effect, Input, ChangeDetectionStrategy } from '@angular/core';
import { DbContentComponent } from './content';
import { HeaderComponent } from './header';
import { SidebarComponent } from './sidebar';
import { TsdLayoutsMenuSection } from '@toshida/ng-components/layouts';

@Component({
  selector: 'tsd-admin-db-container',
  imports: [SidebarComponent, HeaderComponent, DbContentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="app-container"
      [class.sidebar-collapsed]="sidebarCollapsed()"
      [class.light-mode]="isDarkMode() === false"
    >
      <tsd-db-sidebar
        [menuSections]="menuSections"
        [collapsed]="sidebarCollapsed"
        (toggle)="toggleSidebar()"
        [isDarkMode]="isDarkMode"
      />
      <div class="main-wrapper">
        <tsd-db-header
          (toggleMenu)="toggleSidebar()"
          [isDarkMode]="isDarkMode"
          (toggleTheme)="toggleTheme()"
        />
        <tsd-db-content />
      </div>
    </div>
  `,
})
export class AdminDashboardContainerComponent {
  @Input() menuSections = signal<TsdLayoutsMenuSection[]>([]);

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
