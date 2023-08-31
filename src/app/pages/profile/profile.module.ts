import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { BiddingHistoryComponent } from './bidding-history/bidding-history.component';
import { CurrentBidsComponent } from './current-bids/current-bids.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileEditComponent,
    ChangePasswordComponent,
    ProfileViewComponent,
    BiddingHistoryComponent,
    CurrentBidsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule,
    PasswordStrengthMeterModule
  ]
})
export class ProfileModule { }
