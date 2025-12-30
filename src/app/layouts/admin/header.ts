import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tsd-db-header',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <button class="toggle-btn" (click)="onToggleMenu()" title="Toggle menu">
        <div class="hamburger"></div>
      </button>

      <div class="header-title">
        <h1>Dashboard</h1>
      </div>

      <div class="header-actions">
        <input
          type="text"
          class="search-input"
          placeholder="Buscar..."
          [(ngModel)]="searchQuery"
          (input)="onSearch($event)"
        />

        <button class="notification-btn" title="Notificaciones">
          @if (notificationCount() > 0) {
            <span class="badge">{{ notificationCount() }}</span>
          }
        </button>

        <!-- Added theme toggle button -->
        <button
          class="theme-toggle-btn"
          (click)="onToggleTheme()"
          [title]="isDarkMode() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
        >
          {{ isDarkMode() ? '☀️' : '🌙' }}
        </button>

        <div class="user-menu">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
            alt="User"
            class="avatar"
          />
          <span class="user-name">{{ userName() }}</span>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  @Input() isDarkMode = signal(true);
  @Output() toggleMenu = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();

  searchQuery = signal('');
  notificationCount = signal(3);
  userName = signal('Juan Pérez');

  onToggleMenu() {
    this.toggleMenu.emit();
  }

  onToggleTheme() {
    this.toggleTheme.emit();
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    console.log('Searching for:', value);
  }
}
