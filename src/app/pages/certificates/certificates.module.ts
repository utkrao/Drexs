import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificatesRoutingModule } from './certificates-routing.module';
import { CertificatesComponent } from './certificates/certificates.component';
import { MyCertificatesComponent } from './certificates/my-certificates/my-certificates.component';
import { MyDrecsComponent } from './certificates/my-drecs/my-drecs.component';
import { StackedDrecsComponent } from './certificates/stacked-drecs/stacked-drecs.component';
import { SharedModule } from '../../shared/shared.module';
import { ActionConfirmationAlertComponent } from './certificates/my-drecs/action-confirmation-alert/action-confirmation-alert.component';
import { SetListPriceAlertComponent } from './certificates/my-drecs/set-list-price-alert/set-list-price-alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PagesModule } from '../pages.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { StackedDrecsFilterComponent } from './certificates/stacked-drecs/stacked-drecs-filter/stacked-drecs-filter.component';
import { MyDrecsFilterComponent } from './certificates/my-drecs/my-drecs-filter/my-drecs-filter.component';
import { MyCertificateFilterComponent } from './certificates/my-certificates/my-certificate-filter/my-certificate-filter.component';
import { GenerateDrecsAlertComponent } from './certificates/my-certificates/generate-drecs-alert/generate-drecs-alert.component';


@NgModule({
  declarations: [
    CertificatesComponent,
    MyCertificatesComponent,
    MyDrecsComponent,
    StackedDrecsComponent,
    ActionConfirmationAlertComponent,
    SetListPriceAlertComponent,
    StackedDrecsFilterComponent,
    MyDrecsFilterComponent,
    MyCertificateFilterComponent,
    GenerateDrecsAlertComponent
  ],
  imports: [
    CommonModule,
    CertificatesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    PagesModule,
    Ng2FlatpickrModule
  ]

})
export class CertificatesModule { }
