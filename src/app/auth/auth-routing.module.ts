import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { MnemonicCodeComponent } from './mnemonic-code/mnemonic-code.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { WalletProtectComponent } from './wallet-protect/wallet-protect.component';
import { RestoreWalletComponent } from './restore-wallet/restore-wallet.component';
import { ResetPinComponent } from './reset-pin/reset-pin.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'otp',
    component: OtpVerificationComponent,
  },
  {
    path: 'wallet-protect',
    component: WalletProtectComponent,
  },
  {
    path: 'mnemonic-code',
    component: MnemonicCodeComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'restore-wallet',
    component: RestoreWalletComponent,
  },
  {
    path: 'reset-pin',
    component: ResetPinComponent,
  },

  { path: 'forgot-user-pin', loadChildren: () => import('./forgot-user-pin/forgot-user-pin.module').then(m => m.ForgotUserPinModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
