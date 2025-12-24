import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TakExpansionPanelHeaderComponent } from './sidebar/sidenav/expansion/expansion-panel-header.component';
import { TakExpansionPanelComponent } from './sidebar/sidenav/expansion/expansion-panel.component';
import { TakAccordionComponent } from './sidebar/sidenav/expansion/accordion.component';
import { TakBreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TakSidenavComponent } from './sidebar/sidenav/sidenav.component';
import { TakSidebarComponent } from './sidebar/sidebar.component';
import { TakHeaderComponent } from './header/header.component';
import { TakFooterComponent } from './footer/footer.component';
import { TakOriginLayoutComponent } from './layout.component';
import { ValidateAccessPipe } from './services/validate-access.pipe';
import { RoutePartsService, ToggleSidebar } from './services';
import { TakLoader } from './layout.loader';

@NgModule({
  declarations: [
    ValidateAccessPipe,
    TakExpansionPanelHeaderComponent,
    TakExpansionPanelComponent,
    TakBreadcrumbComponent,
    TakAccordionComponent,
    TakSidebarComponent,
    TakSidenavComponent,
    TakOriginLayoutComponent,
    TakHeaderComponent,
    TakFooterComponent,
    TakLoader,
  ],

  imports: [ReactiveFormsModule, RouterModule],
  exports: [TakOriginLayoutComponent, TakLoader],
  providers: [RoutePartsService, ToggleSidebar],
})
export class TakOriginLayoutModule {}
