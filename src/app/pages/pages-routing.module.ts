import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MasternodeComponent } from './masternode/masternode.component';
import { PagesComponent } from './pages.component';
import { ReviewSendComponent } from './review-send/review-send.component';
import { ReviewSwapComponent } from './review-swap/review-swap.component';
import { StakeSummaryComponent } from './stake-summary/stake-summary.component';
import { TransactionPinComponent } from './transaction-pin/transaction-pin.component';
import { DashboardMasternodeComponent } from './dashboard-masternode/dashboard-masternode.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      // {
      //   path: 'dashboard',
      //   component: DashboardComponent
      // },
      {
        path: 'dashboard',
        component: DashboardMasternodeComponent
      },
      {
        path: 'review-send',
        component: ReviewSendComponent
      },
      {
        path: 'review-swap',
        component: ReviewSwapComponent
      },
      {
        path: 'payment/:paymentType',
        component: PaymentComponent
      },
      {
        path: 'transaction-pin/:actionType',
        component: TransactionPinComponent
      },
      {
        path: 'dialog-box',
        component: DialogBoxComponent
      },
      {
        path: 'stake-summary',
        component: StakeSummaryComponent
      },
      {
        path: 'masternode',
        component: MasternodeComponent
      },

      {
        path: 'certificate-wallet',
        loadChildren: () => import('./certificate-wallet/certificate-wallet.module').then(m => m.CertificateWalletModule),
      },

      {
        path: 'certificates',
        loadChildren: () => import('./certificates/certificates.module').then(m => m.CertificatesModule),
      },

      {
        path: 'transaction-history',
        loadChildren: () => import('./transaction-history/transaction-history.module').then(m => m.TransactionHistoryModule),
      },

      {
        path: 'user-node',
        loadChildren: () => import('./user-node/user-node.module').then(m => m.UserNodeModule),
      },

      // {
      //   path: 'profile',
      //   loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      // },

      {
        path: 'profile',
        loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule),
      },

      {
        path: 'messages',
        loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule),
      },
    
      {
        path: 'contact-us',
        loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule),
      },

      {
        path: 'my-wallet',
        loadChildren: () => import('./my-wallet/my-wallet.module').then(m => m.MyWalletModule),
      },

      {
        path: 'marketplace',
        loadChildren: () => import('./marketplace/marketplace.module').then(m => m.MarketplaceModule),
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
