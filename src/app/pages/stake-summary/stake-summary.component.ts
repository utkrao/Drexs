import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StakeSummaryPayload, TransactionPinAction } from '../../core/interfaces';
import { StorageService } from '../../core/services';
import { Location } from '@angular/common';


@Component({
  selector: 'app-stake-summary',
  templateUrl: './stake-summary.component.html',
  styleUrls: ['./stake-summary.component.scss']
})
export class StakeSummaryComponent implements OnInit {
  feeConfig: any;
  data: StakeSummaryPayload;
  total: number;
  loading: boolean;
  constructor(
    private router: Router,
    private storage: StorageService,
    private location: Location,

  ) {
    this.loading = false;
  }

  
  ngOnInit(): void {
    this.data = this.storage.get('stake-summary-data');
    this.storage.set('stake-data', this.data);
  }

  back() {
    this.location.back();
  }

  process() {
    this.loading = true;
    this.router.navigate([`/pages/transaction-pin/${TransactionPinAction.Staking}`])
  }

}
