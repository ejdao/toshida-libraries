import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@toshida/material/progress-spinner';
import { MatTableDataSource } from '@toshida/material/table';

@Component({
  imports: [MatProgressSpinnerModule],
  selector: 'tsd-table-no-records',
  template: `
    @if (isLoading) {
      <div class="tsd-progress-circle__container">
        <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
      </div>
    } @else {
      <div class="tsd-progress-circle__container">
        @if (secondImage) {
          No hay resultados que contengan esta palabra clave
        } @else {
          No se encontraron resultados
        }
      </div>
    }
  `,
  styles: `
    .tsd-progress-circle__container {
      min-height: calc(100vh - 315px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media only screen and (min-width: 640px) {
      .tsd-progress-circle__container {
        min-height: calc(100vh - 230px);
      }
    }
    .tsd-progress-circle__container {
      min-height: calc(100vh - 230px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tsd-progress-circle__container-image {
      min-height: calc(100vh - 230px);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsdTableNoRecordsComponent implements OnInit {
  @Input() dataSource!: MatTableDataSource<any>;

  @Input() isLoading = false;

  private _secondImage = true;

  public ngOnInit(): void {
    if (this.dataSource) {
      if (this.dataSource.data.length && !this.dataSource.filteredData.length)
        this._secondImage = false;
    }
  }

  get secondImage(): boolean {
    return this._secondImage;
  }
}
