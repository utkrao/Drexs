import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateWalletRoutingModule } from './certificate-wallet-routing.module';
import { CertificateWalletComponent } from './certificate-wallet.component';
import { CertificateListingComponent } from './certificate-listing/certificate-listing.component';
import { PagesRoutingModule } from '../pages-routing.module';
import { MintedComponent } from './minted/minted.component';
import { StackingHistoryComponent } from './stacking-history/stacking-history.component';
import { StackingActivitiesComponent } from './stacking-activities/stacking-activities.component';
import { SharedModule } from '../../shared/shared.module';
import { CertificateWalletTabListComponent } from './certificate-wallet-tab-list/certificate-wallet-tab-list.component';


@NgModule({
  declarations: [
    CertificateWalletComponent,
    CertificateListingComponent,
    MintedComponent,
    StackingHistoryComponent,
    StackingActivitiesComponent,
    CertificateWalletTabListComponent,
  ],
  imports: [
    CommonModule,
    CertificateWalletRoutingModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class CertificateWalletModule { }
