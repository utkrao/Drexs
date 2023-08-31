import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'ng-otp-input/lib/models/config';
import { CountdownComponent } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { TransactionPinAction } from '../../core/interfaces';
import { StorageService } from '../../core/services';
import { WalletService } from '../../core/services/wallet.service';
import { Location } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-transaction-pin',
  templateUrl: './transaction-pin.component.html',
  styleUrls: ['./transaction-pin.component.scss']
})
export class TransactionPinComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  loading: boolean;
  disabled: boolean = true;
  pin: number;
  actionType: string;
  config: Config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: true,
    disableAutoFocus: false,
    inputStyles: {
      width: '64px',
      height: '64px',
      padding: '12px',
    }
  };
  paymentStatus : String = "pending";
  apiCalling : boolean = false;

  constructor(
    private storage: StorageService,
    private router: Router,
    private toastr: ToastrService,
    private walletService: WalletService,
    private activeRoute: ActivatedRoute,
    private location: Location,

  ) { }

  pinChange(pin) {
    this.pin = pin;
    this.disabled = this.pin && this.pin.toString().length >=4 ? false : true;
  }

  ngOnInit(): void {
    this.actionType = this.activeRoute.snapshot.paramMap.get('actionType');    
  }

  proceed() {
    const { pin } = this.storage.get('wallet-form-data');
    if (this.pin === pin) {
      if(this.actionType == TransactionPinAction.SendCoin){
        this.sendCoins();
      }
      else if(this.actionType == TransactionPinAction.BuyCoin){
        this.buyCoins();
      }
      else if(this.actionType == TransactionPinAction.Staking){
        this.staking();
      }
      else if(this.actionType == TransactionPinAction.SwapCoin){
        this.swapCoins();
      }
      else if(this.actionType == TransactionPinAction.Bidding){
        this.bidding();
      }

      
      
    } else {
      this.toastr.error('PIN is Invalid');
    }
  }

  onForgotPin(){
    this.router.navigate(['/auth/forgot-user-pin/forgot-pin']);
  }

  sendCoins(){
    this.loading = true;
    const data = this.storage.get('wallet-send-data');
    this.walletService.sendCoins(data).subscribe({
      next: (response) => {
        
        this.loading = false;

        if(response.success){
          this.storage.set('dialog-box-data', { type: 'transaction-success' });
          this.router.navigate(['/pages/dialog-box']);
        }
        else{
          // this.toastr.error(response.message);
          this.storage.set('dialog-box-data', { type: 'transaction-failed' });
          this.router.navigate(['/pages/dialog-box']);
        }
      },
      error: (e) => {
        this.loading = false;
        // this.toastr.error('Something went wrong, Please try again later');
      }
    })
  }



  swapCoins(){
    this.loading = true;
    const data = this.storage.get('wallet-swap-data');

    this.walletService.coinSwapConfirm(data).subscribe({
      next: (response) => {
        
        this.loading = false;

        if(response.success){
          this.storage.set('dialog-box-data', { type: 'swap-success' });
          this.router.navigate(['/pages/dialog-box']);
        }
        else{
          this.toastr.error(response.message);
          this.storage.set('dialog-box-data', { type: 'swap-failed' });
          this.router.navigate(['/pages/dialog-box']);
        }
      },
      error: (e) => {
        this.loading = false;
        // this.toastr.error('Something went wrong, Please try again later');
      }
    })
  }

  buyCoins(){

    interval(1000).subscribe(x => {

      const data = this.storage.get('wallet-buy-payment');

      if(!this.apiCalling && (this.paymentStatus =="pending" ) ){
      
        this.loading = true;
        this.apiCalling = true;

        this.walletService.coinBuyPayment(data).subscribe({
          next: (response) => {
            this.paymentStatus = response.data.paymentStatus;
            this.loading = false;
            this.apiCalling = false;
            
            if(response.data.result.requiredAction){
              window.open(response.data.result.requiredAction.redirectUrl); 
              this.router.navigate(['/pages/my-wallet']);
              // this.storage.set('dialog-box-data', { type: 'transaction-success' });
              // this.router.navigate(['/pages/dialog-box']);
            }
          },
          error: (e) => {              
            this.apiCalling = false;
            // this.toastr.error('Something went wrong, Please try again later');
          }
        })
      }
      });
  }


  staking(){
    this.storage.set('dialog-box-data', { type: 'staking-success' });
    this.router.navigate(['/pages/dialog-box']);

    // this.goBack();
  }

  bidding(){
    this.storage.set('dialog-box-data', { type: 'bidding-successfull' });
    this.router.navigate(['/pages/dialog-box']);
  }

  goBack(): void {
    this.location.back();
  }


}
