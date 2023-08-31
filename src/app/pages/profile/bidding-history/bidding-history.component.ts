import { Component, OnInit } from '@angular/core';
import { IPagination } from '../../../shared/components/pagination/interface';
import * as data from "./data.json";
@Component({
  selector: 'app-bidding-history',
  templateUrl: './bidding-history.component.html',
  styleUrls: ['./bidding-history.component.scss']
})
export class BiddingHistoryComponent implements OnInit {
  loading: boolean;
  count: number;
  limit: number;
  page: number;
  totalPage: number;
  pagination : IPagination;
  listData : Array<any> = [];
  constructor() { 
    this.page = 1;
    this.limit = 10;
    this.pagination = {
      count: 10,
      current_page: 1,
      has_next : true,
      has_previous : false,
      total_page : 10,
      limit: this.limit 
    }
  }

  ngOnInit(): void {
    this.getListData(this.limit, this.page);
  }


  getListData(limit: number, page: number) {
    this.listData = (data as any).default;

  }


  onPageChange(page: number){
    this.page = page;
    this.getListData(this.limit, this.page);
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
