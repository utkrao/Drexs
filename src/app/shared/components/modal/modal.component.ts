import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BeneficialListing, buyData, Coins, PaymentTypes, SendCoinsPayload, SwapCoinsPayload } from '../../../core/interfaces';
import { CommonService, UserService,CardService } from '../../../core/services';
import { StorageService, ElectronService } from '../../../core/services';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode'
import { clipboard } from 'electron';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { WalletService } from '../../../core/services/wallet.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  isShow: boolean;
  type: keyof typeof Coins;
  action: string;
  coinAsset: any;
  sendForm: FormGroup;
  buyForm: FormGroup;
  swapForm: FormGroup;
  loading: boolean = false;
  submitting: boolean = false;
  converting : boolean = false;
  userListData: any;
  keyword: string;
  publicKey: string;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  termSub = new Subject<string>();
  invalidWalletId: boolean;
  walletList: any = [];
  beneficialList: BeneficialListing[];
  swapTypeList: any[];
  networkFee : number = 0;
  errorMessage : string = null;

  adminETHAddress : string = '0x842ea53498bBC99f6193E5c76aD9a4779259715A';
  adminBTCAddress : string = 'tb1qvlqjpnatqr70zhrrgstrv2a97qpr3ax9rfjxtu';

  isMacPlatform:boolean = false;
  subscription: Subscription 

  constructor(
    private common: CommonService,
    private storage: StorageService,
    private router: Router,
    private electron: ElectronService,
    private userService: UserService,
    private toastr: ToastrService,
    private cardService:CardService,
    private walletService:WalletService

  ) {
    this.isMacPlatform = process.platform == "darwin"
    this.sendForm = new FormGroup({
      amount: new FormControl('', [Validators.required, ]),
      name: new FormControl('', [Validators.required]),
    });

    this.buyForm = new FormGroup({
      quantity: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      network_fee: new FormControl(0),

    });

    this.swapForm = new FormGroup({
      from_type: new FormControl('', [Validators.required]),
      to_type: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      swap_amount: new FormControl(0, [Validators.required]),
      network_fee: new FormControl(0),

    });
    

    this.userListData = null;
    this.termSub.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        this.onChangeSearch(value);
      })
  }

  ngOnInit(): void {
    this.common.modalEvent.subscribe((data) => {      
      this.resetForms();
      this.isShow = data.show;
      this.type = data.type;
      this.action = data.action;
      this.coinAsset = data.coinAsset;
      console.log("this.coinAsset: ", this.coinAsset);
      
      const keys = this.storage.get('keys');
      this.publicKey = keys[this.type]?.publicKey;
      if (this.type === 'BTC') {
        this.walletList = data?.walletList;
      }
      if (this.action == 'receive') {
        this.sendForm.controls.name.setValue(this.publicKey);
      }
      if (this.action == 'swap') {
        this.walletList = data?.walletList;
        this.updateSwapTypeList();
        this.swapForm.patchValue({
          to_type : this.type
        })
      }

      if (this.action == 'buy') {
        if(this.type == 'DREXS'){
          this.buyForm.get("quantity").setValidators([Validators.required,Validators.min(1), Validators.max(1)]);
        }
      }


      if(this.coinAsset){
        if(this.type !== 'DREXS') {
          this.sendForm.get("amount").setValidators([Validators.required,Validators.min(0.0001), Validators.max(parseFloat(this.coinAsset.tokenBalance))]);
          this.sendForm.get("amount").updateValueAndValidity();  
        }
        else{
          this.sendForm.get("amount").setValidators([Validators.required,Validators.min(0.0001), Validators.max(parseFloat(this.coinAsset.tokenBalance))]);
          this.sendForm.get("amount").updateValueAndValidity(); 
        }
      }
        
    })
    this.common.popupEvent.subscribe((data) => {
      if (data.show === false) {
        const user = this.storage.get('popup-select-user');
        this.sendForm.controls.name.setValue(user.beneficiary.beneficiaryAddress);
        // this.userListData.name = user.beneficiary.name;
        // this.userListData.address = user.beneficiary.beneficiaryAddress;
      }
    })

  }


  updateSwapTypeList(){

    this.swapTypeList = [
      // {code:Coins.WATT, title: Coins.WATT},
      {code:Coins.ETH, title: Coins.ETH},
      {code:Coins.BTC, title: Coins.BTC},
      // {code:Coins.DREXS, title: Coins.DREXS},
    ].filter((ele)=>{
      if(ele.code != this.type){
        return ele;
      }
    })

    this.swapForm.patchValue({
      from_type : this.swapTypeList[0].code
    })

  }

  ngOnDestroy(): void {
    this.resetForms();
    this.userListData = null;
    this.loading = false;
  }

  resetForms(){
    this.loading = false;
    this.submitting = false;
    this.sendForm.reset();
    this.buyForm.reset();
    this.swapForm.reset();

  }

  onChangeSearch(event) {
    
    this.invalidWalletId = false;
    this.userListData = null;

    if (event) {
      this.userService.getSuggestion({ coinCode: this.type, address: event }).subscribe({
        next: (response) => {
          if (response.success) {
            this.invalidWalletId = false;
            this.userListData = response.data;
          } else {
            this.invalidWalletId = true;
            this.userListData = null;
            this.toastr.error("No result found");
          }
        },
        error: (e) => {
          console.log("Error: ",e);
        }
      })
    }
  }

  openPopup() {
    this.common.togglePopup({ show: true, type: 'saved-beneficiaries-popup', coinCode: this.type });
  }

  addUserBeneficial() {
    this.userService.addBeneficiary({ coinCode: this.type, address: this.userListData.address }).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success('User added as beneficiary.');
        }
      },
      error: (e) => {
        console.log("Error: ",e);
      }
    })
  }

  calculateAmount(e, amount) {        
    e.stopPropagation();
    e.preventDefault();
    let req = {
      tokenAmount:amount?amount:0,
      coinCode: this.type      
   }
   this.loading = true;
    this.cardService.calculateAmount(req).subscribe((res) => {  
      
      if(res && res.data){
        let amountInUSD = res.data.amountInUSD ? res.data.amountInUSD : 0;
        let networkFeeInUSD = res.data.networkFeeInUSD ? res.data.networkFeeInUSD : 0;
  
        if(amountInUSD){
          amountInUSD = parseFloat(amountInUSD).toFixed(2);
          networkFeeInUSD = parseFloat(networkFeeInUSD).toFixed(2);
          this.buyForm.controls.amount.setValue(amountInUSD);
          this.buyForm.controls.network_fee.setValue(networkFeeInUSD);
        }
      }
    

      this.loading = false;

    })
  }

  onSwapTypeChange(){
    this.calculateSwapAmount();
  }

  calculateSwapAmount() {  
    let data = {
      "tokenAmount":this.swapForm.value.swap_amount || 0,
      "coinCode":this.swapForm.value.from_type
    }
    this.converting = true;
    
    if(this.subscription){      
      this.subscription.unsubscribe();
    }
    this.subscription = this.walletService.coinSwapInitiate(data).subscribe((res) => {  
      
      if(res.success){
        this.swapForm.patchValue({
          'amount' : res.data.amountInUSD || 0,
          'network_fee' : res.data.networkFee || 0,
        })
      }
      
      this.converting = false;

    })
        
  }

  async onSubmit(form: FormGroup) {
    this.errorMessage = null;
    try {
      const config = {
        fromAddress: this.storage.get('keys')[this.type].publicKey,
        toAddress: form.value.name,
        amount: form.value.amount,
        coinCode: this.type,
        token:  this.type === 'BTC' ? this.storage.get('keys')[this.type].privateKey.toString() : 
        this.storage.get('keys')[this.type].privateKey.toString().substr(2),
        txrefs: this.type === 'BTC' ? this.walletList?.data.BTC?.txrefs : undefined,
        tokenId:this.type === 'DREXS' ? form.value.amount : undefined
      }

      const feeConfig = await this.electron.ipcRenderer.invoke('calculate-transaction-fee', config);
      const data: SendCoinsPayload = {
        hash: feeConfig?.hash,
        coinCode: this.type,
        fromAddress: this.storage.get('keys')[this.type].publicKey,
        toAddress: form.value.name,
        amount: this.type === 'DREXS' ? undefined : form.value.amount,
        transactionType: this.action,
        tokenId:this.type === 'DREXS' ? form.value.amount : undefined
      }
      this.networkFee = feeConfig.transactionFee;
      const isValidAmount = feeConfig.transactionFee + form.value.amount <= this.coinAsset.tokenBalance 
      if(isValidAmount){
        this.storage.set('wallet-fee-data', feeConfig);
        this.storage.set('wallet-send-data', data);
        this.sendForm.reset();
        this.common.toggleModal({ show: false });
        this.router.navigate(['/pages/review-send']);
      }
      else{
        this.errorMessage = `Wallet Balance is low for transaction with network fee ${feeConfig.transactionFee} ${this.type}`; 
        this.toastr.error(`Wallet Balance is low for transaction with network fee ${feeConfig.transactionFee} ${this.type}`)
      }
 
    } catch (e) {
      this.toastr.error("Something went wrong")
      console.log("Error: ",e);
    }
  }

  onBuySubmit(form: FormGroup){    
    if(form.valid){
      const data: buyData = {
        coinCode: this.type,
        amount: Number(form.value.amount) ,
        quantity: form.value.quantity,
        transactionType: this.action,
        network_fee : Number(form.value.network_fee || 0) ,
      }

      this.storage.set('wallet-buy-data', data);

      this.buyForm.reset();
      this.common.toggleModal({ show: false });
      this.router.navigate([`/pages/payment/${PaymentTypes.BUY_COIN_PAYMENT}`]);
    }
  
  }


  async onSwapSubmit(form: FormGroup) {
    console.log("==> onSwapSubmit");
    
    this.submitting = true;

    try {
      const config = {
        fromAddress: this.storage.get('keys')[form.value.from_type].publicKey,
        toAddress: form.value.from_type === 'BTC' ? this.adminBTCAddress : this.adminETHAddress,
        amount: form.value.swap_amount,
        coinCode: form.value.from_type,
        token:  form.value.from_type === 'BTC' ? this.storage.get('keys')[form.value.from_type].privateKey.toString() : 
        this.storage.get('keys')[form.value.from_type].privateKey.toString().substr(2),
        txrefs: form.value.from_type === 'BTC' ? this.walletList?.data.BTC?.txrefs : undefined,
      }      
      // const feeConfig = await this.electron.ipcRenderer.invoke('generate-swap-hash-key', config);
      const feeConfig = await this.electron.ipcRenderer.invoke('calculate-transaction-fee', config);

      const data: SwapCoinsPayload = {
        hash: feeConfig?.hash,
        coinCode: form.value.from_type,
        // fromAddress: this.storage.get('keys')[form.value.from_type].publicKey,
        // toAddress: form.value.from_type === 'BTC' ? this.adminBTCAddress : this.adminETHAddress,
        amount: form.value.swap_amount,
        transactionType: 'Swap',
      }
      
      this.storage.set('swap-form-data', form.value);
      this.storage.set('wallet-fee-data', feeConfig);
      this.storage.set('wallet-swap-data', data);
      this.swapForm.reset();
      this.common.toggleModal({ show: false });
      this.router.navigate(['/pages/review-swap']);
      
    } catch (e) {
      this.submitting = false;
      this.toastr.error("Something went wrong")
    }
  }


  addUser() { }

  close(type: string) {
    this.resetForms();
    this.userListData = null;
    this.loading = false;
    this.common.toggleModal({ show: false });
  }

  share() {
    const base64Img = document.getElementsByClassName('coolQRCode')[0].children[0]['src'];
    fetch(base64Img)
      .then(res => res.blob())
      .then(async (blob) => {
        let fileData = new Int8Array(await blob.arrayBuffer());
        this.electron.ipcRenderer.send('open-share-menu', fileData);
      })
  }

  downloadQRCode() {
    const fileNameToDownload = 'image_qrcode';
    const base64Img = document.getElementsByClassName('coolQRCode')[0].children[0]['src'];
    fetch(base64Img)
      .then(res => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileNameToDownload;
        link.click();
      })
  }

  copy() {
    clipboard.writeText(this.publicKey);
    this.toastr.info('Address copied to clipboard');
  }
}
