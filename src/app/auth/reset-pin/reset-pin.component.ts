import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../core/services';

@Component({
  selector: 'app-reset-pin',
  templateUrl: './reset-pin.component.html',
  styleUrls: ['./reset-pin.component.scss']
})
export class ResetPinComponent implements OnInit {
  passwordForm: FormGroup;
  password: string;
  pin: number;
  cpin: number;
  showNote: boolean;
  constructor(private router: Router, private storage: StorageService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      pin: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      cpin: new FormControl('', [Validators.required]),
    });
    this.cd.detectChanges();
  }

  onSubmit(form: FormGroup) {
    this.storage.set('dialog-box-data', { type: 'restore-wallet-complete' });
    this.storage.set('wallect-protected', true);
    this.storage.set('wallet-form-data', form.value);
    this.router.navigate(['/dialog-box']);
  }
}
