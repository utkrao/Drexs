import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  loading: boolean;
  constructor(
    private router: Router,
    private userService: UserService,
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
          this.router.navigate(['/auth/otp'], { state: { fromForgot: true, ...data } });
        }
      },
      error: (e) => {
        this.loading = false;
        // this.toastr.error(e.error?.message || 'Invalid Input')
      }
    })
  }
}
