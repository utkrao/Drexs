import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-wallet-tab-list',
  templateUrl: './my-wallet-tab-list.component.html',
  styleUrls: ['./my-wallet-tab-list.component.scss']
})
export class MyWalletTabListComponent implements OnInit {

  @Input() currentTab: number;

  constructor() { }

  ngOnInit(): void {
  }

}
