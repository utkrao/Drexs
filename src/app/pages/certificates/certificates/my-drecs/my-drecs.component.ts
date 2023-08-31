import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { FlatpickrOptions } from "ng2-flatpickr";
import * as data from "./data.json";

@Component({
  selector: 'app-my-drecs',
  templateUrl: './my-drecs.component.html',
  styleUrls: ['./my-drecs.component.scss']
})
export class MyDrecsComponent implements OnInit {

  marketplaceCardList: Array<any> = [];
  selectedCardIdList: Array<any> = [];
  showActionAlert: boolean = false;
  showSetPriceAlert: boolean = false;
  actionId: number = 0;
  per: number = 10;
  cardQuantity: {};

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.getMarketplaceCardList();
  }

  getMarketplaceCardList() {
    this.marketplaceCardList = (data as any).default;
    this.marketplaceCardList.map(ele => {
      ele['selectedQuantity'] = 0;
      ele['cardBalance'] = ele.cardCount;
      return ele

    })
    // this.resetcardQuantity();
  }

  resetcardQuantity() {
    this.marketplaceCardList.forEach(ele => {
      this.cardQuantity[ele.id] = 0
    })
  }

  onSelection(event: any, card: any) {
    card.cardBalance = card.cardCount - card.selectedQuantity;

    if (card.selectedQuantity) {
      if (!this.selectedCardIdList.includes(card.id)) {
        this.selectedCardIdList.push(card.id)
      }
    }
    else {
      this.selectedCardIdList = this.selectedCardIdList.filter(ele => ele != card.id)
    }
  }

  onSelectCard(marketplaceCard: any) {
    if (!this.selectedCardIdList.includes(marketplaceCard.id)) {
      this.selectedCardIdList.push(marketplaceCard.id);
      marketplaceCard.selectedQuantity = 1
    }
    else {
      this.selectedCardIdList = this.selectedCardIdList.filter(ele => ele != marketplaceCard.id)
      marketplaceCard.selectedQuantity = 0
    }
    this.onSelection(null, marketplaceCard)

  }

  openActionAlert(actionId: number) {
    if (this.selectedCardIdList.length) {
      this.actionId = actionId;

      if (actionId == 1) {
        this.showSetPriceAlert = true;

      }
      else {
        this.showActionAlert = true;
      }
    }

  }


  onCloseSetPriceAlert(isConfirm: boolean) {
    console.log("isConfirm: ", isConfirm);
    this.showSetPriceAlert = false;

    if (isConfirm) {
      this.showActionAlert = true;
    }
    else {
      this.actionId = 0;
    }
  }

  onCloseActionAlert(isConfirm: boolean) {
    console.log("isConfirm: ", isConfirm);
    this.showActionAlert = false;

    if(isConfirm && this.actionId == 3){
      this.router.navigate(['/pages/certificates/stacked-drecs']);
    }

    else if(isConfirm && this.actionId == 5){
      this.router.navigate(['/pages/transaction-history/redemption']);
    }

    this.actionId = 0;
  }

}