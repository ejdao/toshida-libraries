import { NgModule } from '@angular/core';
import { TsdTextFieldComponent } from './text-field/component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [FormsModule, ReactiveFormsModule, TsdTextFieldComponent];

@NgModule({
  imports: components,
  exports: components,
})
export class TsdFieldsModule {}
