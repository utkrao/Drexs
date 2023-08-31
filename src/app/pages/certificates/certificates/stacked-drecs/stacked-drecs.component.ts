import { Component, OnInit } from '@angular/core';
import { IPagination } from '../../../../shared/components/pagination/interface';
import * as data from "./data.json";

@Component({
  selector: 'app-stacked-drecs',
  templateUrl: './stacked-drecs.component.html',
  styleUrls: ['./stacked-drecs.component.scss']
})
export class StackedDrecsComponent implements OnInit {

  loading: boolean;
  count: number;
  limit: number;
  page: number;
  totalPage: number;
  pagination : IPagination;

  myStacksDrecsList : Array<any> = [];
  
  allSelected : boolean = false;
  selectedIdList : Array<any> = [];


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
    this.getMyCertificates(this.limit, this.page);
  }


  getMyCertificates(limit: number, page: number) {
    this.myStacksDrecsList = (data as any).default;

  }


  onPageChange(page: number){
    this.page = page;
    this.getMyCertificates(this.limit, this.page);
  }
  
  
  updatePaginationData(){
    this.pagination.count = this.count;
    this.pagination.current_page = this.page;
    this.pagination.has_next = this.page < this.totalPage;
    this.pagination.has_previous = this.page > 1;
    this.pagination.total_page = this.totalPage;
    this.pagination.limit = this.limit;
  }
  

  onSelectAll(event:any){
    
    if(this.allSelected){
      this.selectedIdList = this.myStacksDrecsList.map(ele=> ele.id)
    }
    else{
      this.selectedIdList = [];
    }
  }

  onItemSelect(event:any ,id:any){
    if(event.target.checked){
      this.selectedIdList.push(id);
    }
    else{
      this.selectedIdList = this.selectedIdList.filter(ele=> ele!=id);
    }
    this.allSelected = this.selectedIdList.length == this.myStacksDrecsList.length ? true : false
  }
}
