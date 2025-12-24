import {
  ChangeDetectionStrategy,
  ElementRef,
  Component,
  ViewChild,
  Input,
  AfterViewInit,
} from '@angular/core';

@Component({
  standalone: false,
  selector: 'tak-layout-expansion-panel-header',
  template: `
    <button
      class="tak-layout-expansion-panel-header {{ class }}"
      style="{{ style }}"
      #expansionPanelHeader
      (click)="toggle()"
    >
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakExpansionPanelHeaderComponent implements AfterViewInit {
  @ViewChild('expansionPanelHeader') expansionPanelHeader!: ElementRef;

  @Input() style: string = '';

  @Input() class: string = '';

  public ngAfterViewInit(): void {}

  public toggle(): void {
    const expansionPanelHeader = this.expansionPanelHeader?.nativeElement;
    if (!expansionPanelHeader.classList.contains('tak-layout-accordion')) {
      expansionPanelHeader.classList.toggle('active');
    }
  }
}
