import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgOtpInputModule } from 'ng-otp-input';
import { LayoutModule } from './../components/layout.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ReviewSendComponent } from './review-send/review-send.component';
import { MasternodeComponent } from './masternode/masternode.component';
import { TransactionPinComponent } from './transaction-pin/transaction-pin.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StakeSummaryComponent } from './stake-summary/stake-summary.component';
import { ReviewSwapComponent } from './review-swap/review-swap.component';
import { PaymentComponent } from './payment/payment.component';
import { SpeedometerComponent } from './dashboard/speedometer/speedometer.component';
import { DashboardMasternodeComponent } from './dashboard-masternode/dashboard-masternode.component';
import { EnergyConsumprionChartComponent } from './dashboard-masternode/energy-consumprion-chart/energy-consumprion-chart.component';
import { RewardsChartComponent } from './dashboard-masternode/rewards-chart/rewards-chart.component';
import { EnergyOffsetStatisticsChartComponent } from './dashboard-masternode/energy-offset-statistics-chart/energy-offset-statistics-chart.component';
import { CountMeterBoxComponent } from './dashboard-masternode/count-meter-box/count-meter-box.component';

@NgModule({
  declarations: [
    PagesComponent,
    ReviewSendComponent,
    MasternodeComponent,
    TransactionPinComponent,
    DialogBoxComponent,
    DashboardComponent,
    StakeSummaryComponent,
    ReviewSwapComponent,
    PaymentComponent,
    SpeedometerComponent,
    DashboardMasternodeComponent,
    EnergyConsumprionChartComponent,
    RewardsChartComponent,
    EnergyOffsetStatisticsChartComponent,
    CountMeterBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxPaginationModule,
    LayoutModule,
    SharedModule,
    NgOtpInputModule,
    PagesRoutingModule,
    NgSelectModule
  ]
})
export class PagesModule { }
