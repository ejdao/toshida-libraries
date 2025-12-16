import { NgModule } from '@angular/core';
import { TsdModalComponent } from './component';

const components = [TsdModalComponent];

@NgModule({
  imports: [...components],
  exports: [...components],
})
export class TsdModalModule {}
