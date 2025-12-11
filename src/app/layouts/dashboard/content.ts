import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface StatCard {
  title: string;
  value: string;
  icon: string;
  change: string;
  positive: boolean;
}

interface GeoData {
  country: string;
  percentage: number;
}

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main class="main-content">
      <router-outlet />
    </main>
  `,
})
export class DashboardContentComponent {
  stats = signal<StatCard[]>([
    {
      title: 'Ingresos Totales',
      value: '$45,231',
      icon: '💰',
      change: '+12.5% vs mes anterior',
      positive: true,
    },
    {
      title: 'Usuarios Activos',
      value: '2,847',
      icon: '👤',
      change: '+8.2% vs mes anterior',
      positive: true,
    },
    {
      title: 'Conversiones',
      value: '1,234',
      icon: '🎯',
      change: '-3.1% vs mes anterior',
      positive: false,
    },
    {
      title: 'Tasa de Retención',
      value: '94.5%',
      icon: '📊',
      change: '+2.4% vs mes anterior',
      positive: true,
    },
  ]);

  geoData = signal<GeoData[]>([
    { country: 'Estados Unidos', percentage: 45 },
    { country: 'Europa', percentage: 28 },
    { country: 'Asia', percentage: 18 },
    { country: 'Otros', percentage: 9 },
  ]);
}
