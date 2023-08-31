import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { BiddingHistoryComponent } from './bidding-history/bidding-history.component';
import { CurrentBidsComponent } from './current-bids/current-bids.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ProfileLayoutComponent,
    MyProfileComponent,
    BiddingHistoryComponent,
    CurrentBidsComponent
  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    SharedModule
  ]
})
export class MyProfileModule { }
