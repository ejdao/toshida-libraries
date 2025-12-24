import {
  ChangeDetectionStrategy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Component,
} from '@angular/core';

@Component({
  standalone: false,
  selector: 'tak-layout-accordion',
  template: `
    <div #accordion>
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakAccordionComponent implements AfterViewInit {
  @ViewChild('accordion') accordion: ElementRef | any;

  public ngAfterViewInit(): void {
    const expansionPanels = this.accordion.nativeElement.querySelectorAll(
      '.tak-layout-expansion-panel',
    );

    expansionPanels.forEach((expansionPanel: { classList: { add: (arg0: string) => void } }) => {
      expansionPanel.classList.add(`tak-layout-accordion`);
    });
    const expansionPanelHeaders = this.accordion.nativeElement.querySelectorAll(
      '.tak-layout-expansion-panel-header',
    );
    expansionPanelHeaders.forEach(
      (expansionPanelHeader: { classList: { add: (arg0: string) => void } }) => {
        expansionPanelHeader.classList.add(`tak-layout-accordion`);
      },
    );

    this._subscribeToExpansionPanels(expansionPanels);
  }

  private _subscribeToExpansionPanels(expansionPanels: any): void {
    expansionPanels.forEach((expansionPanel: any) => {
      expansionPanel.addEventListener('click', () => {
        this._activeAccordionMode(expansionPanel);
        expansionPanel.classList.toggle('active');
        try {
          const currentlyActiveExpansionPanel: any = this.accordion.nativeElement.querySelector(
            '.tak-layout-expansion-panel.active',
          );
          currentlyActiveExpansionPanel
            .querySelector('.tak-layout-expansion-panel-header')
            .classList.toggle('active');
        } catch (error) {
          const expansionPanelHeaders = this.accordion.nativeElement.querySelectorAll(
            '.tak-layout-expansion-panel-header',
          );
          expansionPanelHeaders.forEach((expansionPanelHeader: any) => {
            expansionPanelHeader.classList.remove('active');
          });
        }
        const expansionPanelBody: any = expansionPanel.nextElementSibling;
        if (expansionPanel.classList.contains('active')) {
          expansionPanelBody.style.maxHeight = expansionPanelBody.scrollHeight + 'px';
        } else {
          expansionPanelBody.style.maxHeight = 0;
        }
      });
    });
  }

  private _activeAccordionMode(expansionPanel: any): void {
    const currentlyActiveExpansionPanel: any = this.accordion.nativeElement.querySelector(
      '.tak-layout-expansion-panel.active',
    );
    if (currentlyActiveExpansionPanel && currentlyActiveExpansionPanel !== expansionPanel) {
      currentlyActiveExpansionPanel
        .querySelector('.tak-layout-expansion-panel-header')
        .classList.toggle('active');
      currentlyActiveExpansionPanel.classList.toggle('active');
      currentlyActiveExpansionPanel.nextElementSibling.style.maxHeight = 0;
    }
  }
}
