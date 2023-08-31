import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificate-wallet',
  templateUrl: './certificate-wallet.component.html',
  styleUrls: ['./certificate-wallet.component.scss']
})
export class CertificateWalletComponent implements OnInit {

  currentTab : number = null;
  
  constructor() { }

  ngOnInit(): void {
  }

}
