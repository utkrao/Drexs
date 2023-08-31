import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rate-us',
  templateUrl: './rate-us.component.html',
  styleUrls: ['./rate-us.component.scss']
})
export class RateUsComponent implements OnInit {

  @Input() showRateUsPopup:boolean;
  @Output() closeEvent = new EventEmitter<boolean>();

  loading : boolean = false;
  ratingNumbers : Array<number> = [1,2,3,4,5]
  
  constructor() { }

  selectedRating : number = null;

  ngOnInit(): void {
  }

  closePopup(){
    this.closeEvent.emit(true)
  }

  selectRating(rating){
    this.selectedRating = rating;
  }

  proceed(){
    this.selectedRating = null;
    this.closePopup();
  }
}
