import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  OnDestroy,
  Component,
  Output,
  OnInit,
  Input,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, firstValueFrom, takeUntil } from 'rxjs';
import {
  TSD_DEFAULT_APPEARANCE_FORM,
  TSD_FIELDS_PRESS_ESC_KEY,
  TsdConfigAutoCompleteFieldI,
} from '../common';
import { MatProgressSpinnerModule } from '@toshida/material/progress-spinner';
import { MatAutocompleteModule } from '@toshida/material/autocomplete';
import { MatFormFieldModule } from '@toshida/material/form-field';
import { TsdToastService } from '@toshida/ng-components/toast';
import { MatTooltipModule } from '@toshida/material/tooltip';
import { MatSelectModule } from '@toshida/material/select';
import { MatButtonModule } from '@toshida/material/button';
import { MatInputModule } from '@toshida/material/input';
import { MatIconModule } from '@toshida/material/icon';

@Component({
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [TsdToastService],
  selector: 'tsd-remote-autocomplete-field',
  templateUrl: './component.html',
  styles: [
    `
      .ctm-remote-form-field {
        width: calc(100% - 10px);
      }
      mat-spinner.spinner-loading {
        display: inline;
        margin-left: -10px;
        & > svg {
          margin-top: -5px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsdRemoteAutocompleteFieldComponent implements OnInit, OnDestroy {
  @Input() config: TsdConfigAutoCompleteFieldI = {};
  @Input() disabled = false;
  @Input() placeholder = '';

  @Input() showAlert = true;
  @Input() clearSuggestionsOnClearAction = false;
  @Input() acceptNewEntities = false;
  @Input() isUniqResult = false;

  readonly defaultAppearance = TSD_DEFAULT_APPEARANCE_FORM;

  private _unsubscribe$ = new Subject<void>();
  private _isLoadingItem = false;
  private _required = true;
  private _isDisabled = false;

  private _queryByFirstTime = false;

  public canAddNewProduct = true;
  public newProductAdded = false;

  @Output() onSelect = new EventEmitter<any>();
  @Output() onReset = new EventEmitter<any>();

  public suggestions: any[] = [];
  public autocomplete = new FormControl();

  private _isLoading = false;
  public isValueSelected = false;

  constructor(
    private _http: HttpClient,
    private _cd: ChangeDetectorRef,
    private _webToast: TsdToastService,
  ) {}

  public async ngOnInit(): Promise<void> {
    if (!this.config.value) this.config.value = 'nombre';
    if (this.config.hasClearButton === undefined) this.config.hasClearButton = true;
    if (!this.config.complementType) this.config.complementType = 2;
    if (this.disabled) this.disable();
    else this.enable();
    if (this.config.justSearchOneTime && !this._queryByFirstTime) await this._ifIsJustOneTime();
    if (!this.config.justSearchOneTime) this._ifIsNormal();
  }

  private async _ifIsJustOneTime() {
    this._isLoading = true;
    this._cd.markForCheck();
    try {
      this._queryByFirstTime = true;
      const result = await firstValueFrom(
        this._http.get<any>(this.config.url!, {
          params: {
            ...this.config.params,
            pattern: undefined,
          },
        }),
      );
      this.suggestions = result;
    } catch (error: any) {
      if (error && error.error && this.showAlert) {
        this._webToast.danger(error.error.message);
      }
    }

    this._isLoading = false;
    this._cd.markForCheck();
  }

  private _ifIsNormal() {
    this.autocomplete.valueChanges
      .pipe(takeUntil(this._unsubscribe$), debounceTime(500), distinctUntilChanged())
      .subscribe(async (value) => {
        if (
          value &&
          !this.suggestions.filter((suggestion) => suggestion[this.config.value!] === value).length
        ) {
          this._isLoading = true;
          this._cd.markForCheck();

          try {
            const result = await firstValueFrom(
              this._http.get<any>(this.config.url!, {
                params: {
                  ...this.config.params,
                  pattern: value,
                },
              }),
            );

            if (result.length !== 0) {
              this.suggestions = result;
              this.canAddNewProduct = true;
              this.newProductAdded = false;
              if (
                (value as string).toLocaleLowerCase() ===
                  this.suggestions[0][this.config.value!].toLocaleLowerCase().trim() ||
                this.isUniqResult
              ) {
                this.autocomplete.setValue(this.suggestions[0][this.config.value!], {
                  emitEvent: false,
                });
                this.onSelect.emit(this.suggestions[0]);
                document.body.dispatchEvent(TSD_FIELDS_PRESS_ESC_KEY);
                this.canAddNewProduct = false;
                this.newProductAdded = false;
              }
            } else {
              if (!result) {
                if (this.showAlert) {
                  const err = 'No existe entidad que contenga esta palabra clave';
                  this._webToast.danger(err);
                } else {
                  this.canAddNewProduct = true;
                  this.newProductAdded = false;
                }
              }
            }
          } catch (error: any) {
            if (error && error.error && this.showAlert) this._webToast.danger(error.error.message);
          }

          this._isLoading = false;
          this._cd.markForCheck();
        }
      });
  }

  public updateValue(newValue: any, emitEvent = false) {
    if (emitEvent) {
      this.autocomplete.reset();
      setTimeout(() => {
        this.autocomplete.setValue(newValue);
      }, 500);
    } else {
      this.autocomplete.setValue(newValue[this.config.value!], { emitEvent });
    }
  }

  public disable() {
    this._isDisabled = true;
    this.autocomplete.disable();
  }

  public enable() {
    this._isDisabled = false;
    this.autocomplete.enable();
  }

  public reset() {
    this.canAddNewProduct = true;
    this.newProductAdded = false;
    if (this.clearSuggestionsOnClearAction) {
      this.suggestions = [];
    }
    this.autocomplete.reset();
    this.onSelect.emit(null as any);
  }

  public emit(el: any, option: any) {
    if (el.isUserInput) {
      this.onSelect.emit(option);
      this.canAddNewProduct = false;
      this.newProductAdded = false;
    }
  }

  public done() {
    const fakeProducto = this.autocomplete.value;
    this.autocomplete.setValue(fakeProducto, {
      emitEvent: false,
    });
    this.onSelect.emit(fakeProducto);
    document.body.dispatchEvent(TSD_FIELDS_PRESS_ESC_KEY);
    this.suggestions = [];
    this.canAddNewProduct = true;
    this.newProductAdded = true;
  }

  async refresh() {
    this._ifIsJustOneTime();
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  get isLoading() {
    return this._isLoading;
  }

  get required() {
    return this._required;
  }

  get formIsDisabled() {
    return this._isDisabled;
  }

  get isLoadingItem() {
    return this._isLoadingItem;
  }

  get queryByFirstTime() {
    return this._queryByFirstTime;
  }
}
