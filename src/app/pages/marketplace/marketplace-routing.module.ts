import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [      
      
      {
        path: '',
        redirectTo: 'marketplace',
        pathMatch: 'full'
      },
      {
        path: 'marketplace',
        component: MarketplaceComponent
      },

      {
        path: 'checkout',
        component: CheckoutComponent
      },

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
