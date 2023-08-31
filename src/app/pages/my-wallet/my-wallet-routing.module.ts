import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalancesComponent } from './balances/balances.component';
import { EnergyComponent } from './energy/energy.component';
import { MyAssestsComponent } from './my-assests/my-assests.component';
import { MyCollectiblesComponent } from './my-collectibles/my-collectibles.component';
import { MyWalletComponent } from './my-wallet.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';


const routes: Routes = [
  {
    path: '',
    component: MyWalletComponent,
    children: [
      {
        path: '',
        redirectTo: 'balances',
        pathMatch: 'full'
      },
      {
        path: 'my-assets',
        component: MyAssestsComponent
      },
      {
        path: 'my-collectibles',
        component: MyCollectiblesComponent
      },
     
      {
        path: 'transaction-history',
        component: TransactionHistoryComponent
      },
      
      {
        path: 'balances',
        component: BalancesComponent
      },
     
      {
        path: 'energy',
        component: EnergyComponent
      },
      
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWalletRoutingModule { }
