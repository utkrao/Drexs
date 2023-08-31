import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-set-list-price-alert',
  templateUrl: './set-list-price-alert.component.html',
  styleUrls: ['./set-list-price-alert.component.scss']
})
export class SetListPriceAlertComponent implements OnInit {

  @Input()showAlert:boolean;
  @Output()closeEvent = new EventEmitter<boolean>();

  loading : boolean = false;

  setPriceForm: FormGroup;

  constructor() {

    this.setPriceForm = new FormGroup({
      listPrice: new FormControl('', [Validators.required]),

    });
   }

  ngOnInit(): void {
  }

  closePopup(isConfirm:boolean){
    this.closeEvent.emit(isConfirm)
  }

  proceed(){
    this.closePopup(true);
  }
}
