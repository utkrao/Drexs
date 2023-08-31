import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StakeSummaryPayload } from '../../../core/interfaces';
import { StorageService } from '../../../core/services';

@Component({
  selector: 'app-minted',
  templateUrl: './minted.component.html',
  styleUrls: ['./minted.component.scss']
})
export class MintedComponent implements OnInit {

  loading: boolean = false;
  showPopup: boolean = false;

  constructor(
    private storage: StorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  openModal() {
    this.showPopup = true;
  }

  closeModal() {
    this.showPopup = false;
  }

  proceed() {
    this.closeModal();

    const data: StakeSummaryPayload = {
      drexsStacked: '3',
      amount: '123,456',
      energy: '23',
      total: '123,457',
    } 
    this.storage.set('stake-summary-data', data);
    this.router.navigate(['/pages/stake-summary']);

  }
}
