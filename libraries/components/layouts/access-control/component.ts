import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tsd-access-control',
  imports: [FormsModule],
  templateUrl: './component.html',
})
export class AccessControlComponent {
  @Input() title = 'Bienvenido';
  @Input() subTitle = 'Ingresa a tu cuenta';
}
