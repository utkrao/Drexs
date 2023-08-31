import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StackingHistoryComponent } from './stacking-history/stacking-history.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { HomeComponent } from './home/home.component';
import { MyAssetsComponent } from './my-assets/my-assets.component';
import { MyCollectiblesComponent } from './my-collectibles/my-collectibles.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { StakingActivitiesComponent } from './staking-activities/staking-activities.component';
import { UserNodeComponent } from './user-node.component';
import { DappsComponent } from './dapps/dapps.component';


const routes: Routes = [
  {
    path: '',
    component: UserNodeComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'my-wallet',
        component: MyWalletComponent
      },
      {
        path: 'my-assets',
        component: MyAssetsComponent
      },
      {
        path: 'my-collectibles',
        component: MyCollectiblesComponent
      },
      {
        path: 'staking-activities',
        component: StakingActivitiesComponent
      },
      {
        path: 'stacking-history',
        component: StackingHistoryComponent
      },
      {
        path: 'transaction-history',
        component: TransactionHistoryComponent
      },
      {
        path: 'dapps',
        component: DappsComponent
      },
      
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserNodeRoutingModule { }
