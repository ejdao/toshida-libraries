import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Component,
  OnDestroy,
  Optional,
  OnInit,
  Output,
  Input,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  ReactiveFormsModule,
  FormGroupDirective,
  FormsModule,
  FormControl,
  NgControl,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TsdErrorComponent } from '../error/component';
import { TSD_DEFAULT_APPEARANCE_FORM, TsdConfigGeneralFieldI } from '../common';
import { MatFormFieldModule } from '@toshida/material/form-field';
import { MatButtonModule } from '@toshida/material/button';
import { MatInputModule } from '@toshida/material/input';
import { MatIconModule } from '@toshida/material/icon';

@Component({
  imports: [
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    TsdErrorComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  selector: 'tsd-general-field',
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsdGeneralFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() config: TsdConfigGeneralFieldI = {};
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() type: 'password' | 'text' | 'number' = 'text';

  @Output() onExecuteAction = new EventEmitter();
  @Output() onKeyUp = new EventEmitter();

  public onChangeFn = (_: any) => {};
  public onTouchFn = (_: any) => {};

  readonly defaultAppearance = TSD_DEFAULT_APPEARANCE_FORM;

  private _unsubscribe$ = new Subject<void>();
  private _isSubmitted = false;
  private _isInvalid = false;
  private _decrypted = false;
  private _required = false;
  private _value = '';

  constructor(
    @Optional() private _formGroupDirective: FormGroupDirective,
    @Self() @Optional() private _ngControl: NgControl,
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
      form._rawValidators.forEach((r: any) => {
        if (r.name.includes('required')) this._required = true;
      });
    }

    if (this.disabled) this.control.disable();

    if (this.config.isMoney) {
      if (['', null, undefined, '-'].indexOf(this.control.value) < 0) this._addCurrencyMask();
      if (this.config.hasClearButton === undefined) this.config.hasClearButton = true;
    }
  }

  /** @implemented */
  public writeValue(value: string): void {
    if (value === null) this._isInvalid = false;
    this._value = value;
    this._isSubmitted = false;
    this._cd.markForCheck();
  }

  /** @implemented */
  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  /** @implemented */
  public registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }

  public onChange(event: any): void {
    this._value = event.target.value;
    this.onChangeFn(event.target.value);
    if (!this.control.value && this.config.isHidden) this._decrypted = false;
    if (this.control.touched) this._onValidate();
    if (this.config.emitOnKeyUp) this.onKeyUp.emit(this.control.value);
    if (this.config.isMoney) this._addCurrencyMask();
  }

  public onShowPassword(): void {
    if (this.config.isHidden) {
      if (this._decrypted) this._decrypted = false;
      else this._decrypted = true;
    }
  }

  public onFocusOut(): void {
    this.onTouchFn(true);
    this._onValidate();
  }

  private _onValidate(): void {
    if (this.control.invalid) this._isInvalid = true;
    else this._isInvalid = false;
  }

  public onClearControl(): void {
    if (['', null, undefined].indexOf(this.control.value) >= 0) {
      this.control.setValue('', { emitEvent: false });
    } else this.control.setValue('');
    this._value = '';
  }

  public onKeyDown(event: any) {
    if (this.config.isMoney) {
      const pattern = /[0-9.-]/i.test(event.key);
      const validKeyCodes = [8, 46, 37, 39, 9, 17, 16, 67, 86, 109, 189];
      return pattern || validKeyCodes.indexOf(event.keyCode) >= 0;
    } else {
      return true;
    }
  }

  private _addCurrencyMask() {
    const valueFormatted = this.control.value
      .toString()
      .replace(/,/g, '')
      .replace(/ /g, '')
      .replace('$', '');

    if (['', null, undefined, '-'].indexOf(valueFormatted) < 0 && !isNaN(Number(valueFormatted))) {
      const value = '$ ' + Intl.NumberFormat('en-US').format(Number(valueFormatted));
      this.control.setValue(+valueFormatted);
      this._value = value;
    } else if (['-'].indexOf(valueFormatted) >= 0) this.control.setValue('-');
    else this.control.setValue(null);
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  get control(): FormControl {
    return this._ngControl.control as FormControl;
  }

  get directive(): FormGroupDirective {
    return this._formGroupDirective as FormGroupDirective;
  }

  get decrypted() {
    return this._decrypted;
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
