import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'ng-otp-input/lib/models/config';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { StorageService, UserService } from '../../core/services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  pin: number;
  phone: string;
  email: string;
  loading: boolean;
  resending: boolean = false;
  expired: boolean;
  fromForgot: boolean;
  extraData: { email: string; phone: string }
  config: Config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: true,
    disableAutoFocus: false,
    inputStyles: {
      width: '64px',
      height: '64px',
      padding: '12px',
    }
  };
  constructor(
    private storage: StorageService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private location: Location,

  ) {
    this.extraData = {} as { email: string; phone: string };
    this.fromForgot = this.router.getCurrentNavigation()?.extras?.state?.fromForgot;
    this.extraData.email = this.router.getCurrentNavigation()?.extras?.state?.email;
    this.extraData.phone = this.router.getCurrentNavigation()?.extras?.state?.phone;
  }

  ngOnInit(): void {
    if (this.storage.get('signup-form-data')) {
      const { email, phone } = this.storage.get('signup-form-data');
      if (email) this.email = email;
      if (phone) this.phone = phone;
    }
  }

  pinChange(pin) {
    this.pin = pin;
  }

  handleEvent(e: CountdownEvent) {
    if (e.left === 0) {
      this.expired = true;
    }
  }

  resendOtp() {
    this.resending = true;
    this.pin = null;
    this.countdown.restart();
    this.expired = false;

    let data = {} as { email?: string; phone?: any };
    if (this.fromForgot) {
      if (this.extraData.email) {
        data = { email: this.extraData.email };
      } else {
        data = { phone: this.extraData.phone };
      }
    } else {
      if (this.phone) {
        data = { phone: this.phone['e164Number'] };
      } else {
        data = { email: this.email };
      }
    }
    this.userService.sendOtp(data).subscribe({
      next: (response) => {
        if (response.status) {
          this.resending = false;
          this.toastr.success('OTP sent successfully.');
        }
      },
      error: (e) => {
        console.log("Error: ", e);
        this.resending = false;
        // this.toastr.error(e.error?.message);
      }
    })
  }

  verifyOtp() {
    let data = {} as { email?: string; phone?: any };
    if (this.fromForgot) {
      if (this.extraData.email) {
        data = { email: this.extraData.email };
      } else {
        data = { phone: this.extraData.phone };
      }
    } else {
      if (this.phone) {
        data = { phone: this.phone['e164Number'] };
      } else {
        data = { email: this.email };
      }
    }
    if (this.pin && this.pin.toString().length === 4) {
      this.loading = true;
      this.userService.verifyOtp(data, this.pin).subscribe({
        next: (response) => {
          if (response.status) {
            if (this.fromForgot) {
              this.router.navigate(['/auth/reset-password'], { state: { email: this.extraData.email } });
            } else {
              this.storage.set('otp-verfied', true);
              this.loading = false;
              this.router.navigate(['/auth/wallet-protect']);
            }
          }
        },
        error: (e) => {
          console.log("Error: ", e);
          this.loading = false;
          // this.toastr.error(e?.error?.message);
        }
      })
    } else {
      this.toastr.error('Invalid PIN');
    }
  }

  onBack(): void {
    this.location.back();
  }

}
