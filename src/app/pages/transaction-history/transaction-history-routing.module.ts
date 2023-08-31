import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarningsHistoryComponent } from './transaction-history/earnings-history/earnings-history.component';
import { PurchasesHistoryComponent } from './transaction-history/purchases-history/purchases-history.component';
import { RedemptionComponent } from './transaction-history/redemption/redemption.component';
import { SalesHistoryComponent } from './transaction-history/sales-history/sales-history.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { WalletHistoryComponent } from './transaction-history/wallet-history/wallet-history.component';
import { WithdrawalsHistoryComponent } from './transaction-history/withdrawals-history/withdrawals-history.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionHistoryComponent,
    children: [
      {
        path: '',
        redirectTo: 'wallet-history',
        pathMatch: 'full'
      },
      {
        path: 'wallet-history',
        component: WalletHistoryComponent
      },
      {
        path: 'purchases-history',
        component: PurchasesHistoryComponent
      },
      {
        path: 'sales-history',
        component: SalesHistoryComponent
      },
      {
        path: 'earnings-history',
        component: EarningsHistoryComponent
      },
      {
        path: 'withdrawals-history',
        component: WithdrawalsHistoryComponent
      },
      {
        path: 'redemption',
        component: RedemptionComponent
      },

      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionHistoryRoutingModule { }
