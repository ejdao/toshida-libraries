import {
  ChangeDetectorRef,
  OnDestroy,
  Component,
  Optional,
  Input,
  Self,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatOptionModule, MatOptionSelectionChange, ThemePalette } from '@toshida/material/core';
import { MatFormFieldAppearance, MatFormFieldModule } from '@toshida/material/form-field';
import { MatTooltipModule } from '@toshida/material/tooltip';
import { MatSelectModule } from '@toshida/material/select';
import { MatButtonModule } from '@toshida/material/button';
import { MatInputModule } from '@toshida/material/input';
import { MatIconModule } from '@toshida/material/icon';
import { MatMenuModule } from '@toshida/material/menu';
import {
  TSD_DEFAULT_APPEARANCE_FORM,
  TsdAutocompleteFieldType,
  TsdConfigAutoCompleteFieldI,
  TsdConfigFieldI,
} from '../common';
import { TsdErrorComponent } from '../error/component';

@Component({
  imports: [
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    MatTooltipModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TsdErrorComponent,
  ],
  selector: 'tsd-select-field',
  templateUrl: './component.html',
})
export class TsdSelectFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() config: TsdConfigAutoCompleteFieldI = {};
  @Input() disabled = false;
  // @Input() placeholder = '';

  public onChangeFn = (_: any) => {};
  public onTouchFn = (_: any) => {};

  readonly defaultAppearance = TSD_DEFAULT_APPEARANCE_FORM;

  private _unsubscribe$ = new Subject<void>();
  public isSubmitted = false;
  public isInvalid = false;

  // Exclusivos
  @Input() suggestions: any[] = [];
  @Input() type: 'menu' | 'select' = 'select';
  @Input() tooltip = '';
  @Input() icon = 'filter_list';

  @Output() onSelect = new EventEmitter<any>();

  constructor(
    private _cd: ChangeDetectorRef,
    @Self() @Optional() private _ngControl: NgControl,
    @Optional() private _formGroupDirective: FormGroupDirective,
  ) {
    if (_ngControl) this._ngControl.valueAccessor = this;
    if (_formGroupDirective) {
      _formGroupDirective.ngSubmit.pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
        this.isSubmitted = true;
        _cd.markForCheck();
      });
    }
  }

  public ngOnInit(): void {
    if (!this.config.value) this.config.value = 'nombre';
    if (this.config.hasDefaultValue === undefined) this.config.hasDefaultValue = false;

    if (this.suggestions.length && this.config.hasDefaultValue) {
      this._ngControl.control?.setValue(this.suggestions[0]);
    }

    if (this.disabled) this.control.disable();
  }

  public writeValue(value: string): void {}

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }

  public onChange(event: any): void {
    this.onChangeFn(event.target.value);
    if (this.control.touched) this._onValidate();
  }

  public emit(el: MatOptionSelectionChange) {
    if (el.isUserInput) {
      this.onSelect.emit(el.source.value);
      this.isInvalid = false;
    }
  }

  public justEmit(el: any) {
    this.control.setValue(el);
    this.onSelect.emit(el);
    this.isInvalid = false;
  }

  public onFocusOut() {
    this._onValidate();
  }

  private _onValidate(): void {
    if (this.control.invalid) this.isInvalid = true;
    else this.isInvalid = false;
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

  get isDisabled(): boolean | null {
    return this._ngControl.disabled;
  }
}
