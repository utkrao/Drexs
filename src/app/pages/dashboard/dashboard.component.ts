import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private storage: StorageService,
  ) { }

  lastLogin : any = null;

  ngOnInit(): void {
    this.getLastLogin();
   }

  getLastLogin(){    
    if(this.storage.get('lastLogin')){
      this.lastLogin = new Date(this.storage.get('lastLogin')) ;
    }

  }
}
