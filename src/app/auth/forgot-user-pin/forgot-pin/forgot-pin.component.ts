import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService, UserService } from '../../../core/services';

@Component({
  selector: 'app-forgot-pin',
  templateUrl: './forgot-pin.component.html',
  styleUrls: ['./forgot-pin.component.scss']
})
export class ForgotPinComponent implements OnInit {

  forgotForm: FormGroup;
  loading: boolean;
  constructor(
    private router: Router,
    private userService: UserService,
    private storageService: StorageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      emailOrPhone: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(form: FormGroup) {
    this.loading = true;
    const { emailOrPhone } = form.value
    let data = {} as { email: string; phone: string; }
    if (/^\d+$/.test(emailOrPhone)) {
      data.phone = emailOrPhone;
    } else {
      data.email = emailOrPhone;
    }
    this.userService.sendOtp(data).subscribe({
      next: (response) => {
        if (response.status) {
          this.toastr.success('OTP sent successfully')
          this.loading = false;
          this.router.navigate(['/auth/forgot-user-pin/otp-verification'], { state: { fromForgot: true, ...data } });
        }
      },
      error: (e) => {
        this.loading = false;
        // this.toastr.error(e.error?.errors || 'Invalid Input')
      }
    })
  }
}
