import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dapps',
  templateUrl: './dapps.component.html',
  styleUrls: ['./dapps.component.scss']
})
export class DappsComponent implements OnInit {

  public trendingDAppsList = [];
  public topChartDAppsList = [];

  constructor() { }
  
  ngOnInit(): void {
    this.getDappsList();
  }

  getDappsList(){
    this.trendingDAppsList = [
      { 'name': 'Dapp', 'imageUrl': 'assets/img/wtc-icon.svg'},
      { 'name': 'Dapp', 'imageUrl': 'assets/img/wtc-icon.svg'},
      { 'name': 'Dapp', 'imageUrl': 'assets/img/wtc-icon.svg'},
      { 'name': 'Dapp', 'imageUrl': 'assets/img/wtc-icon.svg'},
      { 'name': 'Dapp', 'imageUrl': 'assets/img/wtc-icon.svg'},
    ];

    this.topChartDAppsList = [
      { 'name': 'Dapp', 'imageUrl': 'assets/img/wtc-icon.svg'},
      { 'name': 'Dapp', 'imageUrl': 'assets/img/wtc-icon.svg'},
      { 'name': 'Dapp', 'imageUrl': 'assets/img/wtc-icon.svg'},
      { 'name': 'Dapp', 'imageUrl': 'assets/img/wtc-icon.svg'},
      { 'name': 'Dapp', 'imageUrl': 'assets/img/wtc-icon.svg'},
    ];
  }

}
