import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPinComponent } from './forgot-pin/forgot-pin.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ResetPinComponent } from './reset-pin/reset-pin.component';

const routes: Routes = [

  {
    path: '',
    component: ForgotPinComponent,
  },
  {
    path: 'forgot-pin',
    component: ForgotPinComponent,
  },
  {
    path: 'forgot-pin',
    component: ForgotPinComponent,
  },
  {
    path: 'otp-verification',
    component: OtpVerificationComponent,

  },
  
  {
    path: 'reset-pin',
    component: ResetPinComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotUserPinRoutingModule { }
