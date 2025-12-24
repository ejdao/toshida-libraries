import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'tak-loader',
  template: `<div class="app-loader">
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakLoader {}
