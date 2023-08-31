import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.scss']
})
export class MyWalletComponent implements OnInit {

  currentTab : number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  changeTab(tab:number){
    this.currentTab = tab;
  }

}
