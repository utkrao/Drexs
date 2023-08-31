import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../core/services';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-wallet-protect',
  templateUrl: './wallet-protect.component.html',
  styleUrls: ['./wallet-protect.component.scss']
})
export class WalletProtectComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword: boolean = false;
  showCPassword: boolean = false;
  passwordForm: FormGroup;
  password: string;
  pin: number;
  cpin: number;
  showNote: boolean;
  walletTypeTitle: string;

  constructor(private router: Router, private storage: StorageService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    let walletType = this.storage.get('wallet-type');
    if (walletType == "userwallet") {
      this.walletTypeTitle = "basic user"
    }
    else if (walletType == "masternode") {
      this.walletTypeTitle = "masternode"
    }
    
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      cpassword: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
      cpin: new FormControl('', [Validators.required]),
    });
    this.cd.detectChanges();
  }

  changeStatePasswordChecker(state: number) {
    if (state > 2) {
      this.showNote = true;
    } else {
      this.showNote = false;
    }
  }

  onSubmit(form: FormGroup) {
    this.storage.set('wallect-protected', true);
    this.storage.set('wallet-form-data', form.value);
    this.router.navigate(['/auth/mnemonic-code']);
  }
}
