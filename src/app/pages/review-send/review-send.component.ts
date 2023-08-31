import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SendCoinsPayload, TransactionPinAction } from '../../core/interfaces';
import { StorageService } from '../../core/services';

@Component({
  selector: 'app-review-send',
  templateUrl: './review-send.component.html',
  styleUrls: ['./review-send.component.scss']
})
export class ReviewSendComponent implements OnInit {
  feeConfig: any;
  data: SendCoinsPayload;
  total: number;
  loading: boolean;
  constructor(
    private router: Router,
    private storage: StorageService,
  ) {
    this.loading = false;
  }

  
  ngOnInit(): void {
    this.data = this.storage.get('wallet-send-data');
    this.feeConfig = this.storage.get('wallet-fee-data');
    this.total = Number(this.data.amount) + Number(this.feeConfig.transactionFee)
    // this.data.amount = this.total;
    this.storage.set('wallet-send-data', this.data);
  }

  back() {
    this.router.navigateByUrl('/pages/my-wallet')
  }

  process() {
    this.loading = true;
    this.storage.remove('send-action-data');
    this.router.navigate([`/pages/transaction-pin/${TransactionPinAction.SendCoin}`])
  }

}
