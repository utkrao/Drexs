import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService, UserService } from '../../core/services';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  resetForm: FormGroup;
  email: string;
  loading: boolean;
  showNote: boolean;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private storageService: StorageService,
    private toastr: ToastrService,
  ) {
    this.email = this.router.getCurrentNavigation()?.extras?.state?.email;
  }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  changeStatePasswordChecker(state: number) {
    if (state > 2) {
      this.showNote = true;
    } else {
      this.showNote = false;
    }
  }

  onSubmit(form: FormGroup) {
    this.loading = true;
    const { newPassword } = form.value;
    this.userService.resetPassword({ email: this.email, password: newPassword }).subscribe({
      next: (response) => {
        this.storageService.set('dialog-box-data', { type: 'reset-password-complete' });
        this.loading = false;
        this.router.navigate(['/dialog-box']);
      },
      error: (e) => {
        console.log("Error: ", e);
        this.loading = false;
        // this.toastr.error(e?.error?.message);
      }
    })
  }
}
