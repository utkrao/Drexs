import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiddingHistoryComponent } from './bidding-history/bidding-history.component';
import { CurrentBidsComponent } from './current-bids/current-bids.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'my-profile',
        pathMatch: 'full'
      },
      {
        path: 'my-profile',
        component: MyProfileComponent
      },
      {
        path: 'bidding-history',
        component: BiddingHistoryComponent
      },
      {
        path: 'current-bids',
        component: CurrentBidsComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfileRoutingModule { }
