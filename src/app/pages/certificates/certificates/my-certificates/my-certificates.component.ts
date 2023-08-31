import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPagination } from '../../../../shared/components/pagination/interface';
import * as data from "./data.json";

@Component({
  selector: 'app-my-certificates',
  templateUrl: './my-certificates.component.html',
  styleUrls: ['./my-certificates.component.scss']
})
export class MyCertificatesComponent implements OnInit {

  loading: boolean;
  count: number;
  limit: number;
  page: number;
  totalPage: number;
  pagination : IPagination;

  AllCertificateList : Array<any> = [];

  myCertificateList : Array<any> = [];

  allListSelected : boolean = false;

  allSelected : boolean = false;
  selectedIdList : Array<any> = [];

  selectedQuantity: number = 0
  selectedQuantityPer : number = 0

  totalCertificates : number = 0;

  showAlert: boolean = false;

  constructor(private router: Router,
    ) {

    this.page = 1;
    this.limit = 10;

    this.pagination = {
      count: 10,
      current_page: 1,
      has_next : true,
      has_previous : true,
      total_page : 10,
      limit: this.limit 
    }
   }

  ngOnInit(): void {
    this.getMyCertificates(this.limit, this.page);
  }


  getMyCertificates(limit: number, page: number) {
    this.AllCertificateList = (data as any).default;
    this.totalCertificates = this.AllCertificateList.length;
    this.myCertificateList = this.AllCertificateList.slice(limit*(page-1) , limit*page)
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
      this.selectedIdList = this.myCertificateList.map(ele=> ele.id)
    }
    else{
      this.selectedIdList = [];
    }
    this.allListSelected = false;
  }

  onSelectAllList(event:any){
    
    if(this.allListSelected){
      this.selectedIdList = this.AllCertificateList.map(ele=> ele.id)
      this.allSelected = true;  
    }
    else{
      this.selectedIdList = [];
      this.allSelected = false;  
    }
  }

  onSelectedQuantityChange(event:any){
    console.log("selectedQuantity: ", this.selectedQuantity);
    
  }

  onItemSelect(event:any ,id:any){
    if(event.target.checked){
      this.selectedIdList.push(id);
    }
    else{
      this.selectedIdList = this.selectedIdList.filter(ele=> ele!=id);
    }
    this.allSelected = this.selectedIdList.length == this.myCertificateList.length ? true : false
  }


  onSelection(event:any){
    this.selectedQuantity = this.totalCertificates * this.selectedQuantityPer/100;
    
    this.allListSelected = false;
    this.allSelected = false;

    this.selectedIdList = [];
    this.selectedIdList = this.AllCertificateList.slice(0,this.selectedQuantity).map(ele=> ele.id)
    
  }
  

  openAlert(){
    this.showAlert = true;
  }

  onCloseAlert(isConfirm:boolean){
    console.log("isConfirm: ", isConfirm);
    this.showAlert = false;
    if(isConfirm){
      this.router.navigate(['/pages/certificates/my-drecs']);
    }

  }
}
