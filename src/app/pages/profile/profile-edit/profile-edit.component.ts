import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService, UserService } from '../../../core/services';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;

  loading: boolean;
  constructor(
    private router: Router,
    private storage: StorageService,
    private userService: UserService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
    });
  }


  onSubmit(form: FormGroup) {
    this.loading = true;
    this.userService.updateProfile({ ...form.value }).subscribe({
      next: (response: any) => {
        this.storage.set('profile', response?.profile);
        this.loading = false;
        this.toastr.success(`Profile updated successfully`);

        this.router.navigate(['/pages/profile']);
      },
      error: (e) => {
        this.loading = false;
      }
    })
  }
}
