import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StackingActivitiesComponent } from './stacking-activities/stacking-activities.component';
import { StackingHistoryComponent } from './stacking-history/stacking-history.component';
import { CertificateListingComponent } from './certificate-listing/certificate-listing.component';
import { CertificateWalletComponent } from './certificate-wallet.component';
import { MintedComponent } from './minted/minted.component';

const routes: Routes = [
  {
    path: '',
    component: CertificateWalletComponent,
    children: [
      {
        path: '',
        redirectTo: 'certificate-listing',
        pathMatch: 'full'
      },
      {
        path: 'certificate-listing',
        component: CertificateListingComponent
      },
      {
        path: 'minted',
        component: MintedComponent
      },
      {
        path: 'stacking-activities',
        component: StackingActivitiesComponent
      },
      {
        path: 'stacking-history',
        component: StackingHistoryComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateWalletRoutingModule { }
