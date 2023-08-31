import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { clipboard } from 'electron';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../core/services';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  userProfile : any = {};
  constructor(
    private toastr: ToastrService,
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData(){
    this.userProfile = this.storage.get('profile');
  }

  copy() {
    clipboard.writeText(this.userProfile?._id);
    this.toastr.info('Copied to clipboard');
  }
  cancel(){
    this.router.navigate(['/pages/dashboard']);
  }
  save(){
    this.router.navigate(['/pages/dashboard']);
  }
}
