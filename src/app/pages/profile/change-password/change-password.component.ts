import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService, UserService } from '../../../core/services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  
  resetForm: FormGroup;
  showNote: boolean;

  loading: boolean;
  email: string;

  minPassLength : number = 8;
  passwordType : string = 'basic'

  constructor(
    private router: Router,
    private storage: StorageService,
    private userService: UserService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {

    this.resetForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
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

    let user = this.storage.get('user');

    const formData = {
      userId : user['id'],
      oldPassword : form.value.oldPassword,
      newPassword : form.value.newPassword,
      type : this.passwordType
    }
    this.userService.changePassword(formData).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.toastr.success(`Password changed successfully`);
        this.router.navigate(['/pages/profile']);
      },
      error: (e) => {
        this.loading = false;        
      }
    })
  }
}
