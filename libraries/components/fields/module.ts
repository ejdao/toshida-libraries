import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TsdGeneralFieldComponent } from './general-field/component';
import { TsdAutocompleteFieldComponent } from './autocomplete-field/component';
import { TsdRemoteAutocompleteFieldComponent } from './remote-autocomplete-field/component';
import { TsdSelectFieldComponent } from './select-field/component';
import { TsdDateFieldComponent } from './date-field/component';
import { TsdDateRangeFieldComponent } from './date-range-field/component';

const components = [
  FormsModule,
  ReactiveFormsModule,
  TsdGeneralFieldComponent,
  TsdAutocompleteFieldComponent,
  TsdRemoteAutocompleteFieldComponent,
  TsdSelectFieldComponent,
  TsdDateFieldComponent,
  TsdDateRangeFieldComponent,
];

@NgModule({
  imports: components,
  exports: components,
})
export class TsdFieldsModule {}
