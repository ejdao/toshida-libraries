import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  ResolveEnd,
  ResolveStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { debounceTime, filter, Subscription } from 'rxjs';
import { TakSnavItems } from './navigation-interfaces';
import { RoutePartsService, ToggleSidebar } from './services';
import { FormControl } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'tak-admin-db-container',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakOriginLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scrollLayout') scrollLayout!: ElementRef;

  private _routerSubs!: Subscription;
  private _routerChangeTitleSubs!: Subscription;
  private _sidebarStatus!: Subscription;

  @Input() navigation: TakSnavItems[] = [];

  @Input() appIcon = 'favicon.ico';
  @Input() appTitle = 'KatoLee Devs';
  @Input() appSidebarTitle = 'KatoLee (Sidebar)';
  @Input() appSidebarSubtitle = 'KatoLee (Sidebar)';
  @Input() sidebarDebounceTime = 250;
  @Input() mdWidth = 640;
  @Input() isDinamicSidebar = true;
  @Input() includeBreadcrumbs = false;

  @Input() accordionInCollections = true;
  @Input() disableHiddenCollections = false;

  @Input() hasFooter = true;

  @Input() authorities: any[] = [];
  @Input() context: any;

  private _isModuleLoading: boolean = false;

  private _pageTitle = '';

  private _isSidebarCompact: boolean =
    localStorage.getItem('tak-sidebar-is-compact') === 'true' ? true : false;
  public isSidebarFixed: boolean = false;

  public isMd: boolean = false;

  public sidebarRespForm = new FormControl();

  constructor(
    private _routePartsService: RoutePartsService,
    private _toggleSidebar: ToggleSidebar,
    private _activeRoute: ActivatedRoute,
    private _cd: ChangeDetectorRef,
    private _router: Router,
    private _title: Title,
  ) {}

  public ngOnInit(): void {
    this._title.setTitle(this.appTitle);

    this._changePageTitle();

    this._routerSubs = this._router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this._isModuleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this._isModuleLoading = false;
        this.scrollToTop();
      }
      this._cd.markForCheck();
    });
    document.getElementsByTagName('body')[0].classList.add('tak-layout');
  }

  public ngAfterViewInit(): void {
    if (window.matchMedia(`(max-width:${this.mdWidth}px)`).matches) {
      this._toggleSidebar.closeSidebar();
    }
    this.onResize();

    if (this.isDinamicSidebar) {
      this._sidebarStatus = this.sidebarRespForm.valueChanges
        .pipe(debounceTime(this.sidebarDebounceTime))
        .subscribe((_) => {
          if (!this.isMd && _) this._toggleSidebar.openSidebar();
        });
    }
  }

  @HostListener('window:resize')
  public onResize() {
    this.isMd = window.matchMedia(`(max-width:${this.mdWidth}px)`).matches;
    if (this.isMd) {
      this._toggleSidebar.toggleMobile(true);
    } else {
      this._toggleSidebar.toggleMobile(false);
      if (this.isSidebarFixed) {
        this._toggleSidebar.openSidebar();
      } else {
        this._toggleSidebar.closeSidebar();
      }
      if (!this.isDinamicSidebar) this._toggleSidebar.expansionButton(this.isDinamicSidebar);
    }
    this._cd.markForCheck();
  }

  public sidebarMouseEnter(): void {
    this.sidebarRespForm.setValue(true);
  }

  public sidebarMouseLeave(): void {
    if (!this.isSidebarFixed && !this.isMd) {
      this.sidebarRespForm.setValue(false);
      this._toggleSidebar.closeSidebar();
    }
  }

  public toggleSidebar(event: boolean): void {
    if (event) {
      this._toggleSidebar.closeSidebar();
    } else {
      this._toggleSidebar.openSidebar();
    }
  }

  public onBlockSidebar(event: boolean): void {
    this.isSidebarFixed = event;
    if (event) this.sidebarMouseEnter();

    if (event) document.getElementsByClassName('tak__container')[0].classList.add('sidebar-fixed');
    else document.getElementsByClassName('tak__container')[0].classList.remove('sidebar-fixed');
  }

  public scrollToTop(): void {
    if (this.scrollLayout) this.scrollLayout.nativeElement.scrollTo({ top: 0 });
  }

  private _changePageTitle() {
    this._routerChangeTitleSubs = this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const routeParts = this._routePartsService.generateRouteParts(this._activeRoute.snapshot);
        if (routeParts.length) {
          this._pageTitle = routeParts
            .reverse()
            .map((part) => part.title)
            .reduce((partA, partI) => {
              return `${partA} > ${partI}`;
            });
          this._pageTitle = `${this.appTitle} | ${this._pageTitle}`;
          this._title.setTitle(this._pageTitle);
        }
      });
  }

  public ngOnDestroy(): void {
    this._routerSubs.unsubscribe();
    this._routerChangeTitleSubs.unsubscribe();
    if (this._sidebarStatus) this._sidebarStatus.unsubscribe();
  }

  get isModuleLoading(): boolean {
    return this._isModuleLoading;
  }

  get isSidebarCompact(): boolean {
    return this._isSidebarCompact;
  }
}
