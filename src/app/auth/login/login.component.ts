import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Router } from '@angular/router';
import { StorageService, UserService } from '../../core/services';
import { UserType } from '../../core/interfaces';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const shajs = require('sha.js')

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  loginForm: FormGroup;
  showPassword: boolean = false;
  separateDialCode;
  searchCountryField = SearchCountryField;
  countryISO = CountryISO;
  phoneNumberFormat = PhoneNumberFormat;
  loading: boolean;
  walletType: string;
  walletTypeTitle: string;
  isEmail: boolean;
  checkBoxChecked: boolean;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  constructor(
    private router: Router,
    private storage: StorageService,
    private userService: UserService,
  ) {
    this.separateDialCode = false;
  }

  ngOnInit(): void {

    this.isEmail = true;
    this.checkBoxChecked = false;

    this.walletType = this.storage.get('wallet-type');

    if(this.walletType == "userwallet"){
      this.walletTypeTitle = "basic user"
    }

    else if(this.walletType == "masternode"){
      this.walletTypeTitle = "masternode"
    }

    this.loginForm = new FormGroup({
      phone: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9.-_+]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
      password: new FormControl('', [Validators.required]),
    });
  }

  toggleEmail() {
    this.isEmail = !this.isEmail;
    this.loginForm.get("email").clearValidators();
    this.loginForm.get("email").updateValueAndValidity()
    // this.loginForm.get("phone").clearValidators();
    // this.loginForm.get("phone").updateValueAndValidity()  
    if (this.isEmail) {
      this.loginForm.patchValue({
        "phone": null
      })
      this.loginForm.get("email").setValidators([Validators.email, Validators.required, Validators.pattern("^[a-zA-Z0-9.-_+]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]);
      this.loginForm.get("email").updateValueAndValidity()
    }
    else {
      this.loginForm.patchValue({
        "email": null
      })
      // this.loginForm.get("phone").setValidators([Validators.required]);
      // this.loginForm.get("phone").updateValueAndValidity()  
    }
  }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  checkBox() {
    this.checkBoxChecked = !this.checkBoxChecked;
  }
  
  onSubmit(form: FormGroup) {
    this.loading = true;
    const id = this.storage.get('signup-id');
    const walletType = this.walletType;
    let loginData = {} as { email?: string; phone?: string; password: string; id:string, walletType:string}
    if(form.value.email){
      loginData['email']= form.value.email
    }
    if(form.value.phone){
      loginData['phone']= form.value.phone.e164Number
    }
    loginData['password']= form.value.password
    loginData['id']= id
    loginData['walletType']= walletType

    this.userService.login(loginData).subscribe({
      next: (response: any) => {
        this.storage.set('logged', true);
        this.storage.set('user-name', response?.profile?.name);
        this.storage.set('profile', response?.profile);
        this.storage.set('lastLogin', response?.lastLogin);
        this.storage.set('token', response?.token);
        this.storage.set('kycVerified', response?.kycVerified);
        this.storage.set('user', response?.user);

        let sessionId = response?.token;
        if(sessionId){
          sessionId = shajs('sha256').update(sessionId).digest('hex');
          sessionId = sessionId.substring(0, 50)
          this.storage.set('sessionId', sessionId);
        }

        this.loading = false;

        if (this.walletType === UserType.userwallet) {
          this.router.navigate(['/pages/user-node/home'], { state: { fromLogin: true } });
        } else {
          this.router.navigate(['/pages/dashboard'], { state: { fromLogin: true } });
        }
      },
      error: (e) => {
        console.log("Error: ", e);
        
        this.loading = false;
      }
    })
  }
}
