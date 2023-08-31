import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-meter-box',
  templateUrl: './count-meter-box.component.html',
  styleUrls: ['./count-meter-box.component.scss']
})
export class CountMeterBoxComponent implements OnInit {

  constructor() { }

  public soldDrecs : number = 23567;
  public generatedDrecs : number = 23567;
  public redeemedDrecs : number = 23567;
  public avgPricePerDrecs : number = 1;
  public intervalSD: any;
  public intervalGD: any;
  public intervalRD: any; 

  ngOnInit(): void {

    this.intervalSD = setInterval(() => { 
      this.soldDrecs += 1;
    }, 3000);
    this.intervalGD = setInterval(() => { 
      this.generatedDrecs += 1;
    }, 1000);
    this.intervalRD = setInterval(() => { 
      this.redeemedDrecs += 1;
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalSD);
    clearInterval(this.intervalGD);
    clearInterval(this.intervalRD);

  }

  getSoldDrecs(){
    return this.padWithZero(this.soldDrecs,7).split('')
  }

  getGeneratedDrecs(){
    return this.padWithZero(this.generatedDrecs,7).split('')
  }
  getRedeemedDrecs(){
    return this.padWithZero(this.redeemedDrecs,7).split('')
  }

  padWithZero(num:number, targetLength:number) {
    return String(num).padStart(targetLength, '0');
  }

}
