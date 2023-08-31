import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  public announcementList : Array<any> = [];

  ngOnInit(): void {

    this.getAnnouncementList();
  }



  getAnnouncementList(){
    this.announcementList = [
      {
        title: 'Cryptocurrency Experience Record Outflows in Week 1',
        date : 'Jab 18',
        readingTime: '2 min read',
        imageUrl : 'assets/img/onboarding-placeholder.jpg'
      },
      {
        title: 'Cryptocurrency Experience Record Outflows in Week 1',
        date : 'Jab 18',
        readingTime: '2 min read',
        imageUrl : 'assets/img/onboarding-placeholder.jpg'
      },
      {
        title: 'Cryptocurrency Experience Record Outflows in Week 1',
        date : 'Jab 18',
        readingTime: '2 min read',
        imageUrl : 'assets/img/onboarding-placeholder.jpg'
      },
      {
        title: 'Cryptocurrency Experience Record Outflows in Week 1',
        date : 'Jab 18',
        readingTime: '2 min read',
        imageUrl : 'assets/img/onboarding-placeholder.jpg'
      },
      {
        title: 'Cryptocurrency Experience Record Outflows in Week 1',
        date : 'Jab 18',
        readingTime: '2 min read',
        imageUrl : 'assets/img/onboarding-placeholder.jpg'
      },
      {
        title: 'Cryptocurrency Experience Record Outflows in Week 1',
        date : 'Jab 18',
        readingTime: '2 min read',
        imageUrl : 'assets/img/onboarding-placeholder.jpg'
      },
      {
        title: 'Cryptocurrency Experience Record Outflows in Week 1',
        date : 'Jab 18',
        readingTime: '2 min read',
        imageUrl : 'assets/img/onboarding-placeholder.jpg'
      },
      {
        title: 'Cryptocurrency Experience Record Outflows in Week 1',
        date : 'Jab 18',
        readingTime: '2 min read',
        imageUrl : 'assets/img/onboarding-placeholder.jpg'
      },
      {
        title: 'Cryptocurrency Experience Record Outflows in Week 1',
        date : 'Jab 18',
        readingTime: '2 min read',
        imageUrl : 'assets/img/onboarding-placeholder.jpg'
      },
      {
        title: 'Cryptocurrency Experience Record Outflows in Week 1',
        date : 'Jab 18',
        readingTime: '2 min read',
        imageUrl : 'assets/img/onboarding-placeholder.jpg'
      },
    ]
  }

}
