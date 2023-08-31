import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {

  currentTab : number = 1 ;
  constructor(private router: Router,
    ) { 
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {    
      if(event.url == '/pages/certificates/my-certificates'){
        this.currentTab = 1
      }
      else if(event.url == '/pages/certificates/my-drecs'){
        this.currentTab = 2
      }
      else if(event.url == '/pages/certificates/stacked-drecs'){
        this.currentTab = 3
      }

    });
  }

  ngOnInit(): void {
  }

}
