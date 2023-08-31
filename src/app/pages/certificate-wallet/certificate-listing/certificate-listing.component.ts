import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificate-listing',
  templateUrl: './certificate-listing.component.html',
  styleUrls: ['./certificate-listing.component.scss']
})
export class CertificateListingComponent implements OnInit {

  loading: boolean = false;
  showPopup: boolean = false;
  showData: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.showPopup = true;
  }

  closeModal() {
    this.showPopup = false;
  }

  proceed() {
    this.closeModal();
  }
}
