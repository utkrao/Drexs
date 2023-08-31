import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from '../../core/interfaces';
import { StorageService } from '../../core/services';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private router: Router,
    private storage: StorageService,
  ) { }

  ngOnInit(): void {
  }

  navigate(type) {
    if(type == 'masternode') {
      this.storage.set('wallet-type', UserType.masternode);
    } else if('usernode') {
      this.storage.set('wallet-type', UserType.userwallet);
    }
    
    if(this.storage.get('logged') && this.storage.get('token')){
      if (type === UserType.userwallet) {
        this.router.navigate(['/pages/user-node/home']);
      } else {
        this.router.navigate(['/pages/dashboard']);
      }
    }
    else{
      this.router.navigate(['/auth/signup']);
    }

  }

}
