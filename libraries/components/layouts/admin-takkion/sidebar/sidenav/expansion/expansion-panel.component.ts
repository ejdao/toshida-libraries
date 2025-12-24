import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef,
  Component,
  ViewChild,
  Input,
} from '@angular/core';

@Component({
  standalone: false,
  selector: 'tak-layout-expansion-panel',
  template: `
    <div class="tak-layout-expansion-panel-container">
      <div class="tak-layout-expansion-panel {{ class }}" style="{{ style }}" #expansionPanelHeader>
        <ng-content select="tak-layout-expansion-panel-header"></ng-content>
      </div>
      <div class="tak-layout-expansion-panel-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakExpansionPanelComponent implements AfterViewInit {
  @ViewChild('expansionPanelHeader') expansionPanelHeader!: ElementRef;

  @Input() style: string = '';

  @Input() class: string = '';

  constructor(private _cd: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    const expansionPanelHeader = this.expansionPanelHeader?.nativeElement;
    setTimeout(() => {
      if (!expansionPanelHeader.classList.contains('tak-layout-accordion')) {
        expansionPanelHeader.addEventListener('click', () => {
          expansionPanelHeader.classList.toggle('active');
          const accordionItemBody: any = expansionPanelHeader.nextElementSibling;
          if (expansionPanelHeader.classList.contains('active')) {
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
          } else {
            accordionItemBody.style.maxHeight = 0;
          }
        });
      }
      this._cd.markForCheck();
    }, 100);
  }
}
