import { PagesModule } from './../pages.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { SharedModule } from '../../shared/shared.module';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

@NgModule({
  declarations: [
    MarketplaceComponent,
    HomeComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MarketplaceRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    Ng2FlatpickrModule
  ]
})
export class MarketplaceModule { }
