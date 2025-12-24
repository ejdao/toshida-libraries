import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'tak-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakFooterComponent {}
