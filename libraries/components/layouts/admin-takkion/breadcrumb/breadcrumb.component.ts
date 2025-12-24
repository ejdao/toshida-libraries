import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { RoutePartsService } from '../services';

@Component({
  standalone: false,
  selector: 'tak-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakBreadcrumbComponent implements OnInit, OnDestroy {
  private _routeParts!: any[];
  private _routerEventSub!: Subscription;

  private _base = '';
  private _title = '';
  private _singleRoute = false;

  constructor(
    private router: Router,
    private routePartsService: RoutePartsService,
    private _cd: ChangeDetectorRef,
    private activeRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this._generateTitle();

    this._routerEventSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this._generateTitle();
      });
  }

  private _generateTitle() {
    this._routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
    this._routeParts.reverse().map((item, i) => {
      if (this._routeParts.reverse().length === 1) {
        this._base = item.title;
        this._title = item.title;
        this._singleRoute = true;
      } else {
        this._singleRoute = false;
        if (!i) this._base = item.title;
        if (i === 1) this._title = item.title;
        if (i === 2) this._title += ` / ${item.title}`;
      }
    });

    this._cd.markForCheck();
  }

  public ngOnDestroy(): void {
    if (this._routerEventSub) this._routerEventSub.unsubscribe();
  }

  get base() {
    return this._base;
  }

  get title() {
    return this._title;
  }

  get singleRoute() {
    return this._singleRoute;
  }
}
