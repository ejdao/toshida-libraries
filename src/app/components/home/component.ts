import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@toshida/material/button';
import { MatTabsModule } from '@toshida/material/tabs';
import { TsdFieldsModule } from '@toshida/ng-components/fields';
import { MatIconModule } from '@toshida/material/icon';

@Component({
  imports: [
    MatButtonModule,
    TsdFieldsModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
  ],
  selector: 'app-home',
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class HomeComponent {
  date = new FormControl(new Date());
  inicio = new FormControl(new Date());
  fin = new FormControl(new Date());

  texto = new FormControl(500000);

  constructor() {
    this.texto.valueChanges.subscribe((el) => {
      console.log(el);
    });
  }
}
