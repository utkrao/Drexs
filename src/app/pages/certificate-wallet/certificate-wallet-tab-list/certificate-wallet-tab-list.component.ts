import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-certificate-wallet-tab-list',
  templateUrl: './certificate-wallet-tab-list.component.html',
  styleUrls: ['./certificate-wallet-tab-list.component.scss']
})
export class CertificateWalletTabListComponent implements OnInit {

  @Input() currentTab: number;
  @Output() mintDrexsNftEvent = new EventEmitter<boolean>();
  @Output() stakeDrexsNftEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  mintDrexsNft() {
    this.mintDrexsNftEvent.emit(true)
  }


  stakeDrexsNft() {
    this.stakeDrexsNftEvent.emit(true)
  }

  
}
