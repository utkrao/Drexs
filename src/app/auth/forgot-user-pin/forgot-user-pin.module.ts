import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotUserPinRoutingModule } from './forgot-user-pin-routing.module';
import { ForgotPinComponent } from './forgot-pin/forgot-pin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { DndModule } from 'ngx-drag-drop';
import { CountdownModule } from 'ngx-countdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ResetPinComponent } from './reset-pin/reset-pin.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ForgotPinComponent,
    OtpVerificationComponent,
    ResetPinComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    CountdownModule,
    DndModule,
    NgOtpInputModule,
    ForgotUserPinRoutingModule,
    SharedModule
  ]
})
export class ForgotUserPinModule { }
