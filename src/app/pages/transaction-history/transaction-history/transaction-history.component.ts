import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  currentTab : number = 1 ;
  constructor(private router: Router,
    ) { 
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {    
      if(event.url == '/pages/transaction-history/wallet-history'){
        this.currentTab = 1
      }
      else if(event.url == '/pages/transaction-history/purchases-history'){
        this.currentTab = 2
      }
      else if(event.url == '/pages/transaction-history/sales-history'){
        this.currentTab = 3
      }
      else if(event.url == '/pages/transaction-history/earnings-history'){
        this.currentTab = 4
      }
      else if(event.url == '/pages/transaction-history/withdrawals-history'){
        this.currentTab = 5
      }
      else if(event.url == '/pages/transaction-history/redemption'){
        this.currentTab = 6
      }
    });
  }

  ngOnInit(): void {
  }

}
