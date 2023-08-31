import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-link',
  templateUrl: './back-link.component.html',
  styleUrls: ['./back-link.component.scss']
})
export class BackLinkComponent implements OnInit {

  @Input() backLink: string;

  hasBackLink : boolean = false;
  constructor(
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (window.history.length > 1 || this.backLink) {
      this.hasBackLink = true;
    } 
  }





  onBack(): void {
    if(this.backLink){
      this.router.navigate([this.backLink]);
    }
    else{
      this.location.back();
    }
  }

}
