import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserNodeRoutingModule } from './user-node-routing.module';
import { UserNodeComponent } from './user-node.component';
import { HomeComponent } from './home/home.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { DappsComponent } from './dapps/dapps.component';
import { MyAssetsComponent } from './my-assets/my-assets.component';
import { MyCollectiblesComponent } from './my-collectibles/my-collectibles.component';
import { StakingActivitiesComponent } from './staking-activities/staking-activities.component';
import { StackingHistoryComponent } from './stacking-history/stacking-history.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutModule } from '../../components/layout.module';
import { SharedModule } from '../../shared/shared.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    UserNodeComponent,
    HomeComponent,
    MyWalletComponent,
    DappsComponent,
    MyAssetsComponent,
    MyCollectiblesComponent,
    StakingActivitiesComponent,
    StackingHistoryComponent,
    TransactionHistoryComponent
  ],
  imports: [
    CommonModule,
    UserNodeRoutingModule,

    FormsModule, 
    ReactiveFormsModule,
    NgxPaginationModule,
    LayoutModule,
    SharedModule,
    NgOtpInputModule,
    NgSelectModule
  ]
})
export class UserNodeModule { }
