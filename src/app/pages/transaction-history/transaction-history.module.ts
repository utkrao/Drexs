import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionHistoryRoutingModule } from './transaction-history-routing.module';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { WalletHistoryComponent } from './transaction-history/wallet-history/wallet-history.component';
import { PurchasesHistoryComponent } from './transaction-history/purchases-history/purchases-history.component';
import { SalesHistoryComponent } from './transaction-history/sales-history/sales-history.component';
import { EarningsHistoryComponent } from './transaction-history/earnings-history/earnings-history.component';
import { WithdrawalsHistoryComponent } from './transaction-history/withdrawals-history/withdrawals-history.component';
import { SharedModule } from '../../shared/shared.module';
import { RedemptionComponent } from './transaction-history/redemption/redemption.component';


@NgModule({
  declarations: [
    TransactionHistoryComponent,
    WalletHistoryComponent,
    PurchasesHistoryComponent,
    SalesHistoryComponent,
    EarningsHistoryComponent,
    WithdrawalsHistoryComponent,
    RedemptionComponent
  ],
  imports: [
    CommonModule,
    TransactionHistoryRoutingModule,
    SharedModule
  ]
})
export class TransactionHistoryModule { }
