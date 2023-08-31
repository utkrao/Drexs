import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPagination } from './interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pagination: IPagination;
  @Input() currentPage: number;
  @Output() changePageEvent = new EventEmitter<number>();

  public pageNumberList: Array<number> = [];
  public fromRecord: number = 0;
  public toRecord: number = 0;

  public pageNumbersList: Array<any> = [];

  public pageLimitList = [
    { value: "10", label: "10/page" },
    { value: "20", label: "20/page" },
    { value: "25", label: "25/page" },
  ];
  public selectedPageLimit : string = '10'

  constructor() { }

  ngOnInit(): void {
    if (this.pagination) {
      this.updatePageNumberList();
    }
  }

  changePage(pageNo) {
    if(pageNo){
      this.changePageEvent.emit(pageNo);
    }
  }

  ngOnChanges() {
    this.updatePageNumberList();
    this.updateFromRecord()
    this.updateToRecord()
  }

  updateFromRecord() {
    this.fromRecord = 0
    if (this.pagination.count) {
      if (this.pagination.current_page > 1) {
        this.fromRecord = ((this.pagination.current_page - 1) * this.pagination.limit) + 1
      }
      else {
        this.fromRecord = 1;
      }
    }
  }

  updateToRecord() {
    if (this.pagination.has_next) {
      this.toRecord = this.pagination.current_page * this.pagination.limit;
    }
    else {
      this.toRecord = this.pagination.count;
    }
  }

  updatePageNumberList() {

    this.pageNumberList = this.generateListNumbers();

    console.log("this.pageNumberList: ", this.pageNumberList);
    console.log("this.currentPage: ", this.currentPage);
    this.pageNumbersList = [];
    let lastPage = null;
    this.pageNumberList.forEach(ele=>{

      console.log("ele: ", ele);

      if((this.currentPage == ele || this.currentPage+1 == ele) && !(this.pageNumberList[this.pageNumberList.length-1] == ele || this.pageNumberList[this.pageNumberList.length-2] == ele ) ){
        this.pageNumbersList.push({
          'pageNo': ele,
          'label': `${ele}`
      })
      lastPage = ele;
      }
      
      if(this.pageNumberList[this.pageNumberList.length-1] == ele){
      
        if(this.currentPage == this.pageNumberList[this.pageNumberList.length-1] || this.currentPage == this.pageNumberList[this.pageNumberList.length-2]){
          this.pageNumbersList.push({
            'pageNo': this.pageNumberList[0],
            'label': this.pageNumberList[0]
          })

          this.pageNumbersList.push({
            'pageNo': null, //this.pageNumberList[this.pageNumberList.length-3],
            'label': `...`
          })
          this.pageNumbersList.push({
            'pageNo': this.pageNumberList[this.pageNumberList.length-2],
            'label': this.pageNumberList[this.pageNumberList.length-2]
          })

        }

        else{
          if(this.pageNumberList.length > 3){
            this.pageNumbersList.push({
              'pageNo': null,//lastPage+1,
              'label': `...`
          })
          }
        }

        this.pageNumbersList.push({
          'pageNo': ele,
          'label': `${ele}`
      })
      }

    })
  }

  generateListNumbers() {
    let startPage: number = 1, endPage: number = 1;
    if (this.pagination) {
      if (this.pagination.total_page <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = this.pagination.total_page;
      } else {
        // more than 10 total pages so calculate start and end pages
        if (this.currentPage <= 6) {
          startPage = 1;
          endPage = 10;
        } else if (this.currentPage + 4 >= this.pagination.total_page) {
          startPage = this.pagination.total_page - 9;
          endPage = this.pagination.total_page;
        } else {
          startPage = this.currentPage - 5;
          endPage = this.currentPage + 4;
        }
      }
    }
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    return pages
  }

}
