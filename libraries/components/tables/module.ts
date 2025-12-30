import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@toshida/material/progress-spinner';
import { TsdTableNoRecordsComponent } from './no-records/component';
import { MatPaginatorIntl, MatPaginatorModule } from '@toshida/material/paginator';
import { MatSortModule } from '@toshida/material/sort';
import { MatTableModule } from '@toshida/material/table';
import { getSpanishMatPaginatorIntl } from './translations';

const components = [
  TsdTableNoRecordsComponent,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
];

@NgModule({
  imports: components,
  exports: components,
  providers: [{ provide: MatPaginatorIntl, useValue: getSpanishMatPaginatorIntl() }],
})
export class TsdTablesModule {}
