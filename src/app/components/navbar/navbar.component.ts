import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../core/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  name: string;
  showDropdown: boolean = false;
  showNotification: boolean = false;
  showRateUsPopup: boolean = false;

  constructor(
    private storage: StorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.name = this.storage.get('user-name');
  }

  togglePopup() {
    this.showDropdown = !this.showDropdown;
    this.showNotification = false;

  }

  toggleNotificationPopup() {
    this.showNotification = !this.showNotification;
    this.showDropdown = false;
  }

  openRateUs() {
    this.showDropdown = false;
    this.showRateUsPopup = true;

  }

  closeRateUs() {
    this.showRateUsPopup = false;
  }

  logout() {
    this.storage.remove('logged');
    this.storage.remove('sessionId');
    this.storage.remove('token');
    this.storage.remove('navigation');
    this.router.navigate(['/auth/login']);
  }

}
