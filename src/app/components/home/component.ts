import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TsdDateRangeFieldComponent,
  TsdGeneralFieldComponent,
} from '@toshida/ng-components/fields';

@Component({
  imports: [TsdGeneralFieldComponent, TsdDateRangeFieldComponent, ReactiveFormsModule, FormsModule],
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
