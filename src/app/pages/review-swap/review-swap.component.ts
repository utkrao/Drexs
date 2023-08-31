import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SendCoinsPayload, SwapCoinsPayload, TransactionPinAction } from '../../core/interfaces';
import { StorageService } from '../../core/services';

@Component({
  selector: 'app-review-swap',
  templateUrl: './review-swap.component.html',
  styleUrls: ['./review-swap.component.scss']
})
export class ReviewSwapComponent implements OnInit {
  feeConfig: any;
  swapData: any;
  data: SwapCoinsPayload;
  total: number;
  loading: boolean;
  constructor(
    private router: Router,
    private storage: StorageService,
  ) {
    this.loading = false;
  }

  
  ngOnInit(): void {
    this.data = this.storage.get('wallet-swap-data');
    this.feeConfig = this.storage.get('wallet-fee-data');
    this.swapData = this.storage.get('swap-form-data');

    this.total = Number(this.data.amount) + Number(this.feeConfig.transactionFee)
    // this.data.amount = this.total;
    this.storage.set('wallet-swap-data', this.data);
  }

  back() {
    this.router.navigateByUrl('/pages/my-wallet')
  }

  process() {
    this.loading = true;
    this.storage.remove('swap-action-data');
    this.router.navigate([`/pages/transaction-pin/${TransactionPinAction.SwapCoin}`])
  }

  getCoinTitle(code){
    if(code == 'BTC'){
      return 'Bitcoin'
    }
    else if(code == 'DREXS'){
      return 'Drexs'
    }
    else if(code == 'ETH'){
      return 'Ethereum'
    }
    else if(code == 'WATT'){
      return 'Watt'
    }
  }
}
