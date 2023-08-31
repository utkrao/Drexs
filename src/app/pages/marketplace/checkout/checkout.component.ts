import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services';
import { MarketplaceCartDataI } from '../../../core/interfaces/Marketplace'
import { PaymentDataI, PaymentTypes, TransactionPinAction } from '../../../core/interfaces';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  loading: boolean = false
  selectedOption: number = 1;

  cardData: MarketplaceCartDataI = {
    'totalItems': 0,
    'totalCost': 0,
    'avgUnitCost': 0
  }

  constructor(private router: Router, private storage: StorageService,) { }

  ngOnInit(): void {
    this.getCardData();
  }

  getCardData() {

    this.cardData = this.storage.get('marketplace-cart-data');

  }

  selectOption(val: number) {
    this.selectedOption = val;
  }

  processToPayment() {
    // this.router.navigate(['/pages/marketplace/payment']);
    const paymentData: PaymentDataI = {
      paymentType: 1,
      amount: this.cardData.totalCost,
      quantity: this.cardData.totalItems,
      network_fee: 1,
    }

    this.storage.set('marketplace-payment-data', paymentData);

    this.router.navigate([`/pages/payment/${PaymentTypes.MARKETPLACE_PURCHASE_PAYMENT}`]);

  }

  makeAnOffer() {
    this.router.navigate([`/pages/transaction-pin/${TransactionPinAction.Bidding}`])
  }

  createRange(min: number, max: number) {
    var range = [];
    for (let i = min; i <= max; i++) {
      range.push(i);
    }
    return range;
  }
}
