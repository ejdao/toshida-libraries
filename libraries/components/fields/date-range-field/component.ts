import {
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@toshida/material/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TSD_DEFAULT_APPEARANCE_FORM, TsdConfigDateFieldI } from '../common';
import { MatDatepickerIntl, MatDatepickerModule } from '@toshida/material/datepicker';
import { MatFormFieldModule } from '@toshida/material/form-field';
import { getSpanishMatDatePickerIntl } from '../translations';
import { MatInputModule } from '@toshida/material/input';
import { TsdErrorComponent } from '../error/component';

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    TsdErrorComponent,
    MatDatepickerModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MatDatepickerIntl, useValue: getSpanishMatDatePickerIntl() },
  ],
  selector: 'tsd-date-range-field',
  templateUrl: './component.html',
})
export class TsdDateRangeFieldComponent implements OnInit {
  @Input() config: TsdConfigDateFieldI = {};
  @Input() disabled = false;
  @Input() startPlaceholder: string = 'Inicio';
  @Input() endPlaceholder: string = 'Fin';
  @Input() start!: FormControl;
  @Input() end!: FormControl;

  readonly defaultAppearance = TSD_DEFAULT_APPEARANCE_FORM;

  private _required = false;

  public ngOnInit(): void {
    const start: any = this.start;
    const end: any = this.end;
    if (start?._rawValidators) {
      start._rawValidators.map((r: any) => {
        if (r.name.includes('required')) this._required = true;
      });
    }
    if (end?._rawValidators) {
      end._rawValidators.map((r: any) => {
        if (r.name.includes('required')) this._required = true;
      });
    }
    if (this.disabled) {
      this.start.disable();
      this.end.disable();
    }
  }

  get required() {
    return this._required;
  }

  get isDisabled() {
    return this.start.disabled || this.end.disabled;
  }
}
