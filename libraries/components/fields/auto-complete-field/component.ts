import {
  ChangeDetectorRef,
  EventEmitter,
  Component,
  OnDestroy,
  Optional,
  OnInit,
  Output,
  Input,
  Self,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ControlValueAccessor,
  ReactiveFormsModule,
  FormGroupDirective,
  FormsModule,
  FormControl,
  NgControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, map, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import {
  TSD_DEFAULT_APPEARANCE_FORM,
  TSD_FIELDS_PRESS_ESC_KEY,
  TsdAutocompleteFieldType,
  TsdConfigFieldI,
} from '../common';
import { MatOptionModule, MatOptionSelectionChange, ThemePalette } from '@toshida/material/core';
import { MatProgressSpinnerModule } from '@toshida/material/progress-spinner';
import { MatAutocompleteModule } from '@toshida/material/autocomplete';
import { MatFormFieldAppearance, MatFormFieldModule } from '@toshida/material/form-field';
import { MatButtonModule } from '@toshida/material/button';
import { MatInputModule } from '@toshida/material/input';
import { MatIconModule } from '@toshida/material/icon';
import { TsdErrorComponent } from '../error/component';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TsdErrorComponent,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatOptionModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  selector: 'tsd-auto-complete-field',
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsdAutoCompleteFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() config: TsdConfigFieldI = {};
  @Input() disabled = false;
  @Input() placeholder = '';

  public onChangeFn = (_: any) => {};
  public onTouchFn = (_: any) => {};

  readonly defaultAppearance = TSD_DEFAULT_APPEARANCE_FORM;

  private _unsubscribe$ = new Subject<void>();
  private _isSubmitted = false;
  private _isInvalid = false;
  private _decrypted = false;
  private _required = false;
  private _value = '';

  // Exclusivos
  @Input() option = 'option';
  @Input() extraInfo = '';
  @Input() suggestions: any[] = [];
  @Input() isLoading = false;
  @Input() isRemoteSearch = false;
  @Input() debounceTimeForRemoteSearch = 500;

  @Output() onSelect = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<any>();

  private _filteredOptions!: Observable<any[]>;
  private _notSuggestions = false;
  private _lastValue = '';

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
        if (r.name.includes('required')) this._required = true;
      });
    }

    if (this.disabled) this.control.disable();

    this._filteredOptions = this.control.valueChanges.pipe(
      takeUntil(this._unsubscribe$),
      map(() => this._filter()),
    );

    if (this.isRemoteSearch) {
      this.control.valueChanges
        .pipe(takeUntil(this._unsubscribe$), debounceTime(this.debounceTimeForRemoteSearch))
        .subscribe(() => {
          if (this._lastValue !== `${this._value}` && `${this._value}` && !this.control.value) {
            this.onSearch.emit(`${this._value}`);
            this._setValue(`${this._value}`);
          }

          this._lastValue = `${this._value}`;
        });
    }
  }

  /** @implemented */
  public writeValue(value: string): void {
    if (value === null) this._isInvalid = false;
    this._value = value || '';
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
    if (event.target.value !== `${this._value}`) {
      this._value = event.target.value;
      if (!this.isRemoteSearch) this._setValue(`${this._value}`);
      this.onChangeFn(
        this.suggestions.filter(
          (sug) => `${sug[this.option]}`.toLowerCase() === `${`${this._value}`}`.toLowerCase(),
        )[0] || null,
      );
      if (!this.control.value && this.config.isHidden) this._decrypted = false;
      if (this.control.touched) this._onValidate();
    }
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
    this.control.setValue('', { emitEvent: false });
    this._value = '';
  }

  /** @exclusivo */
  public onFocus() {
    if (!`${this._value}`) {
      this.control.setValue('');
      this._value = '';
    }
  }

  /** @exclusivo */
  private _filter(): any[] {
    const value =
      typeof `${this._value}` === 'string'
        ? `${this._value}`.toLowerCase()
        : `${this.control.value[this.option]}`.toLowerCase();
    const option = this.suggestions.filter((res) =>
      `${res[this.option]}`.toLowerCase().includes(value),
    );
    if (!option.length) this._notSuggestions = true;
    else this._notSuggestions = false;
    return option;
  }

  /** @exclusivo */
  private _setValue(value: string) {
    if (!this.isRemoteSearch) {
      const suggestionsFiltered = value
        ? this.suggestions.filter(
            (el) =>
              `${el[this.option]}`.toLowerCase().trim() === (value as string).toLowerCase().trim(),
          )
        : [];

      if (suggestionsFiltered.length) {
        document.body.dispatchEvent(TSD_FIELDS_PRESS_ESC_KEY);
      }

      try {
        this.control.setValue(suggestionsFiltered[0][this.option], {
          emitEvent: false,
        });
        this.onSelect.emit(suggestionsFiltered[0]);
      } catch (error) {}
    }
  }

  /** @exclusivo */
  public emit(el: MatOptionSelectionChange) {
    if (el && el.isUserInput) this._isInvalid = false;
  }

  /** @exclusivo */
  public emitWithClick(suggestionOption: any) {
    this.control.setValue(suggestionOption);
    this._value = `${suggestionOption[this.option]}`;
    this._isInvalid = false;
  }

  /** @exclusivo */
  public setValue(value: any) {
    this.control.setValue(value);
    this._value = `${value[this.option]}`;
  }

  /** @exclusivo */
  public onUpdateSuggestions(suggestions: any[]) {
    this.suggestions = suggestions;
    this._cd.markForCheck();

    this.onChangeFn(
      this.suggestions.filter(
        (sug) => `${sug[this.option]}`.toLowerCase() === `${this._value}`.toLowerCase(),
      )[0] || null,
    );
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
    return `${this._value}`;
  }

  /** @exclusivo */
  get filteredOptions() {
    return this._filteredOptions;
  }

  /** @exclusivo */
  get notSuggestions() {
    return this._notSuggestions;
  }

  /** @exclusivo */
  get lastValue() {
    return this._lastValue;
  }
}
