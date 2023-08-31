
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-action-confirmation-alert',
  templateUrl: './action-confirmation-alert.component.html',
  styleUrls: ['./action-confirmation-alert.component.scss']
})
export class ActionConfirmationAlertComponent implements OnInit {

  @Input()showActionAlert:boolean;
  @Input()actionId:number;
  @Output()closeEvent = new EventEmitter<boolean>();

  loading : boolean = false;

  alertTitles : Object = {
    1: 'Confirm List',
    2: 'Confirm Delist',
    3: 'Confirm Stak',
    4: 'Confirm Unstak',
    5: 'Confirm Redeem',
  } 

  alertDescriptions : Object = {
    1: 'Are you sure you want to list your  DRECs on the marketplace?',
    2: 'Are you sure you want to Delist DRECs from the marketplace?',
    3: 'Are you sure you want to stake these DRECs',
    4: 'Are you sure you want to unstake your DRECs',
    5: 'Are you sure you want to redeem 247 DRECs',
  } 

  constructor() { }

  ngOnInit(): void {
  }

  getAlertTitle(){
    return this.alertTitles[this.actionId]
  }

  getAlertDescription(){
    return this.alertDescriptions[this.actionId]
  }

  closePopup(isConfirm:boolean){
    this.closeEvent.emit(isConfirm)
  }

  proceed(){
    this.closePopup(true);
  }
}
