import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { LAYOUT_CONTAINER } from '../services/toggle-sidebar';

@Component({
  standalone: false,
  selector: 'tak-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakHeaderComponent implements AfterViewInit {
  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();

  @Input() mdWidth = 640;
  @Input() isActionButton = false;

  public isScreenMd = false;

  constructor(private _cd: ChangeDetectorRef) {}

  @HostListener('window:resize')
  public onResize() {
    this.isScreenMd = window.matchMedia(`(max-width:${this.mdWidth}px)`).matches;
    this._cd.markForCheck();
  }

  public onToggleSidebar(): void {
    const isOpen = document
      .getElementsByClassName(LAYOUT_CONTAINER)[0]
      .classList.contains('compact');

    if (isOpen) {
      this.toggleSidebar.emit(false);
    } else {
      this.toggleSidebar.emit(true);
    }
  }

  public ngAfterViewInit(): void {
    this.onResize();
  }
}
