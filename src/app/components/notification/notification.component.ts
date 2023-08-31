import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() showModal: boolean;
  @Output() closeEvent = new EventEmitter<boolean>();


  newNotificationList: Array<any> = [];
  notificationList: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.newNotificationList = [
      {
        id: 1,
        message: 'Tim Jack & 2 other customers onboarded Lorem Ipsum is simply dummy text of the ',
        time: '01:21 PM'
      },
      {
        id: 1,
        message: 'Tim Jack & 2 other customers onboarded Lorem Ipsum is simply dummy text of the ',
        time: '01:21 PM'
      },
      {
        id: 1,
        message: 'Tim Jack & 2 other customers onboarded Lorem Ipsum is simply dummy text of the ',
        time: '01:21 PM'
      },
    ];


    this.notificationList = [
      {
        id: 1,
        message: 'Tim Jack & 2 other customers onboarded Lorem Ipsum is simply dummy text of the ',
        time: '01:21 PM'
      },
      {
        id: 1,
        message: 'Tim Jack & 2 other customers onboarded Lorem Ipsum is simply dummy text of the ',
        time: '01:21 PM'
      },
      {
        id: 1,
        message: 'Tim Jack & 2 other customers onboarded Lorem Ipsum is simply dummy text of the ',
        time: '01:21 PM'
      },
      {
        id: 1,
        message: 'Tim Jack & 2 other customers onboarded Lorem Ipsum is simply dummy text of the ',
        time: '01:21 PM'
      },
    ];

  }

  closeModal(){
    this.closeEvent.emit(true)
  }

}
