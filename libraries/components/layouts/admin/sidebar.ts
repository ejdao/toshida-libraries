import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TsdLayoutsMenuSection, TsdLayoutsNavItem } from '@toshida/ng-components/layouts';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tsd-db-sidebar',
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="sidebar" [class.collapsed]="collapsed()">
      <div class="sidebar-header">
        <div class="logo" [class.collapsed]="collapsed()">
          @if (collapsed()) {
            <span class="logo-icon">📊</span>
          }
          @if (!collapsed()) {
            <span class="logo-text">Dashboard</span>
          }
        </div>
      </div>

      <!-- Wrapped nav content in scrollable container -->
      <nav class="sidebar-content scrollable">
        @for (section of menuSections(); track $index) {
          <div class="menu-section">
            @if (!collapsed()) {
              <div class="section-title">{{ section.title }}</div>
            }
            <div class="sidebar-nav">
              @for (item of section.items; track $index) {
                <div class="nav-item-wrapper">
                  <a
                    (click)="selectItem(item, section)"
                    class="nav-item"
                    [class.active]="item.active"
                    [class.has-subitems]="item.subitems && item.subitems.length > 0"
                    [routerLink]="
                      [''].indexOf(item.url!) >= 0
                        ? (item.urlExtension || '') + item.url
                        : undefined
                    "
                  >
                    <span class="nav-icon">{{ item.icon }}</span>
                    @if (!collapsed()) {
                      <span class="nav-label">{{ item.label }}</span>
                    }
                    @if (item.subitems && item.subitems.length > 0 && !collapsed()) {
                      <span class="expand-icon" [class.expanded]="item.expanded"> ▼ </span>
                    }
                  </a>
                  @if (item.subitems && item.subitems.length > 0 && item.expanded && !collapsed()) {
                    <div class="subitems">
                      <ng-container
                        *ngTemplateOutlet="
                          subitemTemplate;
                          context: {
                            items: item.subitems,
                            parentItem: item,
                            parentSection: section,
                          }
                        "
                      ></ng-container>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        }
      </nav>

      <div class="sidebar-footer">
        <button class="nav-item" (click)="onToggle()">
          <span class="nav-icon">{{ collapsed() ? '→' : '←' }}</span>
          @if (!collapsed()) {
            <span class="nav-label">Collapse</span>
          }
        </button>
      </div>
    </aside>

    <ng-template
      #subitemTemplate
      let-items="items"
      let-parentItem="parentItem"
      let-parentSection="parentSection"
    >
      @for (subitem of items; track $index) {
        <div class="nav-item-wrapper nested">
          <a
            (click)="
              subitem.subitems && subitem.subitems.length > 0
                ? toggleNestedItem($event, subitem)
                : selectSubitem(subitem, parentItem, parentSection)
            "
            class="subitem"
            [class.active]="subitem.active"
            [class.has-nested]="subitem.subitems && subitem.subitems.length > 0"
            [routerLink]="
              !subitem.url
                ? undefined
                : (parentSection.urlExtension || '') +
                  (parentSection.urlExtension ? '/' : '') +
                  (parentItem.urlExtension || '') +
                  (parentItem.urlExtension ? '/' : '') +
                  subitem.url
            "
          >
            {{ subitem.isSubmodule }}
            {{ subitem.label }}
            @if (subitem.subitems && subitem.subitems.length > 0) {
              <span class="expand-icon nested-expand" [class.expanded]="subitem.expanded"> ▼ </span>
            }
          </a>
          @if (subitem.subitems && subitem.subitems.length > 0 && subitem.expanded) {
            <div class="nested-subitems">
              <ng-container
                *ngTemplateOutlet="
                  subitemTemplate;
                  context: {
                    items: subitem.subitems,
                    parentItem: parentItem,
                    parentSection: parentSection,
                  }
                "
              ></ng-container>
            </div>
          }
        </div>
      }
    </ng-template>
  `,
})
export class SidebarComponent {
  @Input() menuSections = signal<TsdLayoutsMenuSection[]>([]);
  @Input() collapsed = signal(false);
  @Input() isDarkMode = signal(true);
  @Output() toggle = new EventEmitter<void>();

  accordionMode = signal(true);

  selectItem(item: TsdLayoutsNavItem, section: TsdLayoutsMenuSection) {
    if (item.subitems && item.subitems.length > 0) {
      this.menuSections.update((sections) =>
        sections.map((sec) => ({
          ...sec,
          items: sec.items.map((i) => {
            if (this.accordionMode() && i.label !== item.label && i.expanded) {
              return { ...i, expanded: false };
            }
            return {
              ...i,
              expanded: i.label === item.label ? !i.expanded : i.expanded,
            };
          }),
        })),
      );
    } else {
      this.menuSections.update((sections) =>
        sections.map((sec) => ({
          ...sec,
          items: sec.items.map((i) => ({
            ...i,
            active: i.label === item.label,
          })),
        })),
      );
    }
  }

  toggleNestedItem(event: Event, item: TsdLayoutsNavItem) {
    console.log(item);
    event.stopPropagation();
    item.expanded = !item.expanded;
    this.menuSections.update((sections) => [...sections]);
  }

  selectSubitem(
    subitem: TsdLayoutsNavItem,
    parentItem: TsdLayoutsNavItem,
    _section: TsdLayoutsMenuSection,
  ) {
    this.menuSections.update((sections) =>
      sections.map((sec) => ({
        ...sec,
        items: sec.items.map((i) => ({
          ...i,
          active: i.label === parentItem.label,
          subitems: i.subitems?.map((sub) => ({
            ...sub,
            active: sub.label === subitem.label,
          })),
        })),
      })),
    );
  }

  onToggle() {
    this.toggle.emit();
  }
}
