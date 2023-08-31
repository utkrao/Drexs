import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyWalletRoutingModule } from './my-wallet-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MyAssestsComponent } from './my-assests/my-assests.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { MyCollectiblesComponent } from './my-collectibles/my-collectibles.component';
import { MyWalletComponent } from './my-wallet.component';
import { MyWalletTabListComponent } from './my-wallet-tab-list/my-wallet-tab-list.component';
import { BalancesComponent } from './balances/balances.component';
import { EnergyComponent } from './energy/energy.component';


@NgModule({
  declarations: [
    MyAssestsComponent,
    TransactionHistoryComponent,
    MyCollectiblesComponent,
    MyWalletComponent,
    MyWalletTabListComponent,
    BalancesComponent,
    EnergyComponent,
  ],
  imports: [
    CommonModule,
    MyWalletRoutingModule,
    SharedModule
  ]
})
export class MyWalletModule { }
