import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-generate-drecs-alert',
  templateUrl: './generate-drecs-alert.component.html',
  styleUrls: ['./generate-drecs-alert.component.scss']
})
export class GenerateDrecsAlertComponent implements OnInit {

  @Input()showAlert:boolean;
  @Output()closeEvent = new EventEmitter<boolean>();

  loading : boolean = false;
 
  constructor() { }

  ngOnInit(): void {
  }

  closePopup(isConfirm:boolean){
    this.closeEvent.emit(isConfirm)
  }

  proceed(){
    this.closePopup(true);
  }
}
