import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { StorageService, UserService } from '../../core/services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  separateDialCode = true;
  searchCountryField = SearchCountryField;
  countryISO = CountryISO;
  phoneNumberFormat = PhoneNumberFormat;
  checkBoxChecked: boolean;
  loading: boolean;
  isEmail: boolean;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  signupId: string;
  walletTypeTitle: string;

  constructor(
    private router: Router,
    private storage: StorageService,
    private userService: UserService,
    private toastr: ToastrService,
    private location: Location,

  ) {
    this.checkBoxChecked = false;
    this.isEmail = true;
    this.signupId = this.storage.get('signup-id');
    let walletType = this.storage.get('wallet-type');

    if (walletType == "userwallet") {
      this.walletTypeTitle = "basic user"
    }
    else if (walletType == "masternode") {
      this.walletTypeTitle = "masternode"
    }
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]*')]),
      lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]*')]),
      email: new FormControl('', [Validators.email, Validators.required, Validators.pattern("^[a-zA-Z0-9.-_+]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
      phone: new FormControl('', [])
    });
  }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  toggleEmail() {
    this.isEmail = !this.isEmail;
    this.signupForm.get("email").clearValidators();
    this.signupForm.get("email").updateValueAndValidity()
    // this.signupForm.get("phone").clearValidators();
    // this.signupForm.get("phone").updateValueAndValidity()  
    if (this.isEmail) {
      this.signupForm.patchValue({
        "phone": null
      })
      this.signupForm.get("email").setValidators([Validators.email, Validators.required, Validators.pattern("^[a-zA-Z0-9.-_+]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]);
      this.signupForm.get("email").updateValueAndValidity()
    }
    else {
      this.signupForm.patchValue({
        "email": null
      })
      // this.signupForm.get("phone").setValidators([Validators.required]);
      // this.signupForm.get("phone").updateValueAndValidity()  
    }
  }

  onSubmit(form: FormGroup) {
    this.loading = true;
    const { email, phone } = form.value
    let data = {} as { email?: string; phone?: string }
    if (phone) {
      data = { phone: phone.e164Number };
    } else {
      data = { email };
    }
    this.userService.userExist(data)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.loading = false;
            this.toastr.error("You are a registered user .Please login using Restore wallet");
          }
          else {
            this.sendOtp(form);
          }
        },
        error: (e) => {
          console.log("Error: ", e);
          this.loading = false;
          if (e?.error?.success === false) {
            this.sendOtp(form);
          }
          else {
            this.toastr.error(e?.statusText);
          }
        }
      });
  }

  sendOtp(form: FormGroup) {
    this.loading = true;
    const { email, phone } = form.value
    this.storage.set('otp-requested', true);
    this.storage.set('signup-form-data', form.value);
    let data = {} as { email?: string; phone?: string }
    if (phone) {
      data = { phone: phone.e164Number };
    } else {
      data = { email };
    }
    this.userService.sendOtp(data)
      .subscribe({
        next: (response) => {
          if (response.status) {
            this.loading = false;
            this.router.navigate(['/auth/otp'], {
              state: {
                fromLogin: false,
              }
            });
          }
        },
        error: (e) => {
          console.log("Error: ", e);
          this.loading = false;
          // this.toastr.error(e?.error?.message);
        }
      });
  }

  checkBox() {
    this.checkBoxChecked = !this.checkBoxChecked;
  }
  
  onBack(): void {
    this.location.back();
  }

}
