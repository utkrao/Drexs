import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit {

  currentTab : number = 1 ;
  constructor(private router: Router,
    ) { 
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {    
      if(event.url == '/pages/profile/my-profile'){
        this.currentTab = 1
      }
      else if(event.url == '/pages/profile/bidding-history'){
        this.currentTab = 2
      }
      else if(event.url == '/pages/profile/current-bids'){
        this.currentTab = 3
      }

    });
  }

  ngOnInit(): void {
  }

}
