import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TsdTextFieldComponent } from './text-field/component';
import { TsdAutoCompleteFieldComponent } from './auto-complete-field/component';

const components = [
  FormsModule,
  ReactiveFormsModule,
  TsdTextFieldComponent,
  TsdAutoCompleteFieldComponent,
];

@NgModule({
  imports: components,
  exports: components,
})
export class TsdFieldsModule {}
