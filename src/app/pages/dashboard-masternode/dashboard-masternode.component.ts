import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-masternode',
  templateUrl: './dashboard-masternode.component.html',
  styleUrls: ['./dashboard-masternode.component.scss']
})
export class DashboardMasternodeComponent implements OnInit {

  constructor() { }

  public drecsBalance : number = 12345;
  public usdBalance : number = 269340.55;

  ngOnInit(): void {
  }

}
