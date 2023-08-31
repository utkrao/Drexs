import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationComponent } from './notification/notification.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { RateUsComponent } from './navbar/rate-us/rate-us.component';


@NgModule({
  declarations: [SidebarComponent, NavbarComponent, NotificationComponent, RateUsComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  exports: [SidebarComponent, NavbarComponent, NotificationComponent]
})
export class LayoutModule { }
