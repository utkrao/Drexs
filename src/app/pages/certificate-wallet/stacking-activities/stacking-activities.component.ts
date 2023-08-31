import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionHistory } from '../../../core/interfaces';
import { WalletService } from '../../../core/services/wallet.service';
import { IPagination } from '../../../shared/components/pagination/interface';

@Component({
  selector: 'app-stacking-activities',
  templateUrl: './stacking-activities.component.html',
  styleUrls: ['./stacking-activities.component.scss']
})
export class StackingActivitiesComponent implements OnInit {
  loading: boolean;
  count: number;
  limit: number;
  page: number;
  totalPage: number;
  history: TransactionHistory[];
  pagination : IPagination;

  constructor(
    private router: Router,
    private wallet: WalletService,
  ) {
    
    this.page = 1;
    this.limit = 5;

    this.pagination = {
      count: 10,
      current_page: 1,
      has_next : false,
      has_previous : false,
      total_page : 1,
      limit: this.limit 
    }
  }

  ngOnInit(): void {
    // this.getHistory(this.limit, this.page);
  }

  getHistory(limit: number, page: number) {
    this.loading = true;
    this.wallet.getStakingHistory(limit, page).subscribe({
      next: (response) => {
        this.history = response.data;
        this.count = response.count;
        this.loading = false;
        this.totalPage = Math.ceil(this.count/this.limit) 
        this.updatePaginationData();
      },
      error: (e) => {
        this.loading = false;
      }
    })
  }

  onPageChange(page: number){
    this.page = page;
    this.getHistory(this.limit, this.page);
  }
  
  
  updatePaginationData(){
    this.pagination.count = this.count;
    this.pagination.current_page = this.page;
    this.pagination.has_next = this.page < this.totalPage;
    this.pagination.has_previous = this.page > 1;
    this.pagination.total_page = this.totalPage;
    this.pagination.limit = this.limit;
  }
  
}
