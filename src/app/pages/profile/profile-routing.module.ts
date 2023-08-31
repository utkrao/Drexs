import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiddingHistoryComponent } from './bidding-history/bidding-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CurrentBidsComponent } from './current-bids/current-bids.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile-view',
        pathMatch: 'full'
      },
      {
        path: 'profile-view',
        component: ProfileViewComponent
      },
      {
        path: 'bidding-history',
        component: BiddingHistoryComponent
      },
      {
        path: 'current-bids',
        component: CurrentBidsComponent
      }
    ]
  },
  {
    path: 'edit',
    component: ProfileEditComponent,
  },

  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
