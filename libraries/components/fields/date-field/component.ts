import {
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  Component,
  Optional,
  OnInit,
  Input,
  Self,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { TSD_DEFAULT_APPEARANCE_FORM, TsdConfigDateFieldI } from '../common';
import { MatFormField, MatLabel } from '@toshida/material/form-field';
import { MatDatepickerIntl, MatDatepickerModule } from '@toshida/material/datepicker';
import { MatInputModule } from '@toshida/material/input';
import { TsdErrorComponent } from '../error/component';
import {
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@toshida/material/core';
import { getSpanishMatDatePickerIntl } from '../translations';

@Component({
  imports: [
    MatLabel,
    MatFormField,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    TsdErrorComponent,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MatDatepickerIntl, useValue: getSpanishMatDatePickerIntl() },
  ],
  selector: 'tsd-date-field',
  templateUrl: './component.html',
})
export class TsdDateFieldComponent
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor
{
  @Input() config: TsdConfigDateFieldI = {};
  @Input() disabled = false;
  @Input() placeholder = '';

  public onChangeFn = (_: any) => {};
  public onTouchFn = (_: any) => {};

  readonly defaultAppearance = TSD_DEFAULT_APPEARANCE_FORM;

  private _unsubscribe$ = new Subject<void>();
  private _isSubmitted = false;
  private _isInvalid = false;
  private _required = false;
  private _value = '';

  constructor(
    @Self() @Optional() private _ngControl: NgControl,
    @Optional() private _formGroupDirective: FormGroupDirective,
    private _cd: ChangeDetectorRef,
  ) {
    if (_ngControl) this._ngControl.valueAccessor = this;
    if (_formGroupDirective) {
      _formGroupDirective.ngSubmit.pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
        this._isSubmitted = true;
        _cd.markForCheck();
      });
    }
  }

  public ngOnInit(): void {
    const form: any = this.control;
    if (form?._rawValidators) {
      form._rawValidators.map((r: any) => {
        if (r.name.includes('required')) {
          this._required = true;
        }
      });
    }
    if (this.disabled) this.control.disable();
  }

  public ngAfterViewInit(): void {
    const isValidDate = Date.parse(this.control.value);
    if (isNaN(isValidDate)) this.control.setValue(null);
    else this.control.setValue(new Date(this.control.value));
  }

  public writeValue(value: string): void {
    if (value === null) this._isInvalid = false;
    this._value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }

  public onChange(event: any): void {
    this._value = event.target.value;
    this.onChangeFn(event.target.value);
    if (this.control.touched) this._onValidate();
  }

  public onFocusOut(): void {
    this.onTouchFn(true);
    this._onValidate();
  }

  public onCloseDatePicker(): void {
    this.onTouchFn(true);
    this._onValidate();
  }

  private _onValidate(): void {
    const isValidDate = Date.parse(this.control.value);
    if (
      this.control.invalid ||
      ([undefined, null, ''].indexOf(this.control.value) < 0 &&
        this.control.valid &&
        isNaN(isValidDate))
    ) {
      this._isInvalid = true;
    } else {
      this._isInvalid = false;
    }
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  get control(): FormControl {
    return this._ngControl?.control as FormControl;
  }

  get directive(): FormGroupDirective {
    return this._formGroupDirective as FormGroupDirective;
  }

  get isDisabled() {
    return this._ngControl.disabled;
  }

  get isSubmitted() {
    return this._isSubmitted;
  }

  get isInvalid() {
    return this._isInvalid;
  }

  get required() {
    return this._required;
  }

  get value() {
    return this._value;
  }
}
