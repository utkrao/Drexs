import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CountdownModule } from 'ngx-countdown';
import { WalletProtectComponent } from './wallet-protect/wallet-protect.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { MnemonicCodeComponent } from './mnemonic-code/mnemonic-code.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DndModule } from 'ngx-drag-drop';
import { NgOtpInputModule } from 'ng-otp-input';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LandingComponent } from './landing/landing.component';
import { RestoreWalletComponent } from './restore-wallet/restore-wallet.component';
import { ResetPinComponent } from './reset-pin/reset-pin.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    OtpVerificationComponent,
    WalletProtectComponent,
    MnemonicCodeComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LandingComponent,
    RestoreWalletComponent,
    ResetPinComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    CountdownModule,
    DndModule,
    NgOtpInputModule,
    PasswordStrengthMeterModule,
    SharedModule,
    FontAwesomeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
