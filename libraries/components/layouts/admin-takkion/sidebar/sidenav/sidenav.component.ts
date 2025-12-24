import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { ToggleSidebar } from '../../services';
import { TakSnavItems } from '../../navigation-interfaces';

@Component({
  standalone: false,
  selector: 'tak-sidenav',
  templateUrl: './sidenav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakSidenavComponent implements OnInit {
  @Input() navigation: TakSnavItems[] = [];
  @Input() authorities: any[] = [];
  @Input() context: any;
  @Input() mdWidth = 640;
  @Input() accordionInCollections = true;
  @Input() disableHiddenCollections = false;

  private _isMobile = false;

  constructor(
    private _toggleSidebar: ToggleSidebar,
    private _cd: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.navigation.map((item) => {
      if (item.showCollectionContent === undefined) {
        if (this.disableHiddenCollections) item.showCollectionContent = true;
        else item.showCollectionContent = false;
      }

      if (['dropdown', 'collection'].indexOf(item.type) >= 0) {
        const dropdowns = item.type === 'dropdown' ? [item] : item.objects;

        let avalaibleModules = 0;

        try {
          dropdowns?.map((dr) => {
            if (dr.dropdownLinks) {
              let avalaibleModulesDropdown = 0;
              dr.dropdownLinks.forEach((dl) => {
                if (dl.authorities) {
                  this.authorities.forEach((au) => {
                    if (dl.authorities!.includes(au)) {
                      if (
                        !dl.disableOnContexts?.includes(this.context) &&
                        !dl.forceDisabledContent
                      ) {
                        avalaibleModules++;
                        avalaibleModulesDropdown++;
                      }
                    }
                  });
                } else {
                  if (!dl.disableOnContexts?.includes(this.context) && !dl.forceDisabledContent) {
                    avalaibleModules++;
                    avalaibleModulesDropdown++;
                  }
                }
              });
              if (!avalaibleModulesDropdown) dr.forceDisabledContent = true;
              else dr.forceDisabledContent = false;
            } else {
              if (dr.authorities) {
                this.authorities.forEach((au) => {
                  if (dr.authorities!.includes(au)) {
                    if (!dr.disableOnContexts?.includes(this.context) && !dr.forceDisabledContent) {
                      avalaibleModules++;
                    }
                  }
                });
              } else {
                if (!dr.disableOnContexts?.includes(this.context) && !dr.forceDisabledContent) {
                  avalaibleModules++;
                }
              }
            }

            if (!avalaibleModules) item.forceDisabledContent = true;
            else item.forceDisabledContent = false;
          });
        } catch (error) {}
      }
    });
  }

  public onCloseSidebar() {
    const matches = window.matchMedia(`(max-width:${this.mdWidth}px)`).matches;
    if (matches) this._toggleSidebar.closeSidebar();
    else this._isMobile = false;

    this._cd.markForCheck();
  }

  public toggleModule(index: number) {
    if (!this.disableHiddenCollections)
      this.navigation.map((item, i) => {
        if (index === i && item.showCollectionContent === false) item.showCollectionContent = true;
        else if (index === i && item.showCollectionContent === true) {
          item.showCollectionContent = false;
        } else if (this.accordionInCollections) {
          item.showCollectionContent = false;
        }
      });
  }

  @HostListener('window:resize')
  public onResize() {
    this.onCloseSidebar();
  }

  get isMobile() {
    return this._isMobile;
  }
}
