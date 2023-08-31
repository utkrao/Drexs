import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { buyData, Coins, PaymentByTypes, PaymentDataI, PaymentTypes, purchaseSummary, TransactionPinAction } from '../../core/interfaces';
import { ElectronService, StorageService } from '../../core/services';
import { CardService } from '../../core/services/card.service';
import { v4 as uuidv4 } from 'uuid';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


function validateExpityDate(c: FormControl) {
  if (c.value) {
    let expiryDate = c.value.split("/")
    let valid = true;
    const currentYear = parseInt(new Date().getFullYear().toString().slice(-2));
    if (parseInt(expiryDate[0]) > 12) {
      valid = false;
    }
    else if (parseInt(expiryDate[1]) < currentYear) {
      valid = false;
    }
    return valid ? null : {
      validateExpityDate: {
        valid: false
      }
    };
  }
  return null;
}


function noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  savedCardList: Array<any> = [];
  savedAccountList: Array<any> = [{'id':1, 
                                    'bankName':'ICICI Bank Ltd',
                                    'accountHolderName': 'Micheal Scott', 
                                    'accountNumber': '1234********23'}];
  countryList: Array<any> = [];
  dictrictList: Array<any> = [];
  showAddNewCardForm: boolean = true;
  showDistrictDrp: boolean = false;
  cardType: String;
  clientIpAddress: String;
  loading: boolean = false;
  cardLoader: boolean = false;
  newCardForm: FormGroup;
  purchaseSummary: purchaseSummary;
  buyData: buyData;
  marketplacePaymentData : PaymentDataI;
  selectedCard = null;
  selectedAccount = null;
  cardCvv: number;
  idempotencyKey: string;
  encryptionData: any;
  paymentType : string = null;

  BY_CREDIT_DEBIT_CARD : string = PaymentByTypes.BY_CREDIT_DEBIT_CARD
  BY_BANK_TRANSFER : string = PaymentByTypes.BY_BANK_TRANSFER
  BY_WALLET : string = PaymentByTypes.BY_WALLET
  selectedPaymentByOption : string = PaymentByTypes.BY_CREDIT_DEBIT_CARD

  constructor(
    private card: CardService,
    private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private electron: ElectronService,
    private location: Location,
    private toastr: ToastrService,

  ) {
    this.newCardForm = new FormGroup({
      card_no: new FormControl('', [Validators.required, Validators.pattern('^[0-9\/\']+'), noWhitespaceValidator]),
      expiry_date: new FormControl('', [Validators.required, Validators.pattern('^[0-9\/\']+'), validateExpityDate]),
      cvv: new FormControl('', [Validators.required, Validators.pattern('^[0-9\']+'), noWhitespaceValidator]),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]*'), noWhitespaceValidator]),
      last_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]*'), noWhitespaceValidator]),
      city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]*'), noWhitespaceValidator]),
      country: new FormControl(null, [Validators.required]),
      district: new FormControl('', [Validators.required]),
      line1: new FormControl('', [Validators.required, noWhitespaceValidator]),
      line2: new FormControl('', [Validators.required, noWhitespaceValidator]),
      postal_code: new FormControl('', [Validators.required, noWhitespaceValidator]),

    });
  }

  ngOnInit(): void {
    this.paymentType = this.route.snapshot.paramMap.get('paymentType');
    this.getSavedCardList();
    this.getClientIpAddress();
    this.getPurchaseSummary();
    this.getCountryList();
    this.idempotencyKey = uuidv4();
  }


  getCountryList() {
    this.card.getCountryList().subscribe({
      next: (response) => {
        this.countryList = response.result;
      },
      error: (e) => {
        console.log("Error", e);
      }
    })
  }


  getDistrictList(countryCode) {
    this.card.getDistrictList(countryCode).subscribe({
      next: (response) => {
        this.dictrictList = response.result;
      },
      error: (e) => {
        console.log("Error", e);
      }
    })
  }

  onCountryChange() {
    this.showDistrictDrp = false;
    this.newCardForm.patchValue({
      'district': null
    })
    this.newCardForm.get("district").clearValidators();
    this.newCardForm.get("district").updateValueAndValidity()

    if (['US', 'CA'].includes(this.newCardForm.value.country)) {
      this.showDistrictDrp = true;
      this.newCardForm.get("district").setValidators([Validators.required]);
      this.newCardForm.get("district").updateValueAndValidity()
      this.getDistrictList(this.newCardForm.value.country);
    }

  }


  getClientIpAddress() {
    this.card.getClientIpAddress().subscribe({
      next: (response) => {
        this.clientIpAddress = response.ip;
      },
      error: (e) => {
        console.log("Error", e);
      }
    })
  }

  getSavedCardList() {
    this.loading = true;
    this.card.getCardList().subscribe({
      next: (response) => {
        this.savedCardList = response.data;
        this.loading = false;
      },
      error: (e) => {
        this.loading = false;
      }
    })
  }

  selectCard(card:any) {
    this.cardCvv = null;
    this.selectedCard = card;
  }

  selectAccount(account:any) {
    this.selectedAccount = account;
  }

  selectPaymentByOption(val:string){
    this.selectedCard = null;
    this.selectedAccount = null;
    this.cardCvv = null;
    this.selectedPaymentByOption = val;
  }

  isCoinBuyPayment(){
    return this.paymentType == PaymentTypes.BUY_COIN_PAYMENT;
  }
  isPurchasePayment(){
    return this.paymentType == PaymentTypes.MARKETPLACE_PURCHASE_PAYMENT;
  }

  getPurchaseSummary() {
    if(this.paymentType == PaymentTypes.BUY_COIN_PAYMENT){
      this.buyData = this.storage.get('wallet-buy-data');
      const drexs_fee = 0;
      let amount_payable = Number(this.buyData.amount) + Number(this.buyData.network_fee) + Number(drexs_fee);
      this.purchaseSummary = {
        paying_amount: this.buyData.amount,
        network_fee: this.buyData.network_fee,
        drexs_fee: drexs_fee,
        amount_payable: Number(amount_payable.toFixed(2)),
      }
    }
    
    else if(this.paymentType == PaymentTypes.MARKETPLACE_PURCHASE_PAYMENT){
      this.marketplacePaymentData = this.storage.get('marketplace-payment-data');
      const drexs_fee = 0;
      let amount_payable = Number(this.marketplacePaymentData.amount) + Number(this.marketplacePaymentData.network_fee) + Number(drexs_fee);
      this.purchaseSummary = {
        paying_amount: this.marketplacePaymentData.amount,
        network_fee: this.marketplacePaymentData.network_fee,
        drexs_fee: drexs_fee,
        amount_payable: Number(amount_payable.toFixed(2)),
      }
    }



  }

  openAddNewCardForm() {
    this.newCardForm.reset();
    this.showAddNewCardForm = true;
  }

  closeAddNewCardForm() {
    this.newCardForm.reset();
    this.showAddNewCardForm = false;
  }

  updateExpiryDate(event) {
    if (event.keyCode != 8 && this.newCardForm.value.expiry_date && this.newCardForm.value.expiry_date.length == 2) {
      let newValue = this.newCardForm.value.expiry_date.slice(0, 2) + "/" + this.newCardForm.value.expiry_date.slice(2);
      this.newCardForm.patchValue({
        expiry_date: newValue
      })
    }
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.cardLoader = true;
      this.card.getEncryptionKey().subscribe({
        next: async (response) => {
          this.encryptionData = response.data;
          const { coinCode } = this.storage.get('wallet-buy-data');
          const encrypted = await this.electron.ipcRenderer.invoke('generate-card-encryption-key', {
            encryptKey: this.encryptionData,
            cardDetails: {
              number: form.controls.card_no.value,
              cvv: form.controls.cvv.value,
            },
            coinCode: coinCode
          });

          let expiryDate = form.value.expiry_date.split("/")
          let userProfile = this.storage.get('profile');
          let billingDetails = {
            name: `${form.value.name} ${form.value.last_name}`,
            city: form.value.city,
            country: form.value.country,
            line1: form.value.line1,
            line2: form.value.line2,
            postalCode: form.value.postal_code,
          }

          if (form.value.district) {
            billingDetails['district'] = form.value.district
          }

          let addCardData = {
            idempotencyKey: this.idempotencyKey,
            keyId: this.encryptionData.keyId,
            encryptedData: encrypted.encryptedData,
            billingDetails: billingDetails,
            expMonth: expiryDate[0],
            expYear: "20" + expiryDate[1],
            metadata: {
              // "phoneNumber": "+12025550180",
              email: userProfile?.email || '',
              sessionId: this.storage.get('sessionId'),
              ipAddress: this.clientIpAddress
            }
          }

          this.card.addCard(addCardData).subscribe({
            next: (response) => {
              this.closeAddNewCardForm();
              this.getSavedCardList();
              this.cardLoader = false;
            },
            error: (e) => {
              this.cardLoader = false;
            }
          })
        },
        error: (e) => {
          this.cardLoader = false;
        }
      })
    }
    else {
      this.toastr.error("Please enter the valid card details")
    }
  }

  processToBuy() {
    this.loading = true;
    this.card.getEncryptionKey().subscribe({
      next: async (response) => {
        this.encryptionData = response.data;
        const { amount, coinCode, quantity, transactionType, network_fee } = this.storage.get('wallet-buy-data');
        let userProfile = this.storage.get('profile');
        const encrypted = await this.electron.ipcRenderer.invoke('generate-card-encryption-key', {
          encryptKey: this.encryptionData,
          cardDetails: {
            cvv: this.cardCvv,
          },
          coinCode: coinCode
        });

        // TODO: Need to make it dynamic
        const data: any = {
          "paymentInfo": {
            "idempotencyKey": uuidv4(),
            "keyId": this.encryptionData.keyId,
            "encryptedData": encrypted.encryptedData,
            "metadata": {
              "email": userProfile?.email || '',
              "ipAddress": this.clientIpAddress,
              "sessionId": this.storage.get('sessionId'),
            },
            "amount": {
              "amount": this.purchaseSummary.amount_payable,
              "currency": "USD"
            },
            "verification": "three_d_secure",
            "verificationSuccessUrl": "https://api-drex-dev.devtomaster.com/auth/payment?status=success",
            "verificationFailureUrl": "https://api-drex-dev.devtomaster.com/auth/payment?status=failure",
            "source": {
              "id": this.selectedCard.cardId,
              "type": "card"
            },
          },
          "tokenInfo": {
            "tokenAmount": quantity,
            "coinCode": coinCode,
            "usdAmount": amount,
            "userAddress": this.storage.get('keys')[coinCode].publicKey,
            "transactionType": transactionType,
            "ipfsHash": 'QmYA2fn8cMbVWo4v95RwcwJVyQsNtnEwHerfWR8UNtEwoE'
          }
        }

        if (coinCode == Coins.DREXS) {
          const ipfcHash = await this.electron.ipcRenderer.invoke('generate-ipfc-hash', {
            encryptKey: this.encryptionData.publicKey,
          });
          data['tokenInfo']['ipfsHash'] = ipfcHash
        }
        this.storage.set('wallet-buy-payment', data);
        this.storage.remove('buy-action-data');
        this.router.navigate([`/pages/transaction-pin/${TransactionPinAction.BuyCoin}`])
      },
      error: (e) => {
        console.log("Error: ", e);
        this.loading = false;
      }
    })
  }

  processToPurchase(){
    this.storage.set('dialog-box-data', { type: 'purchase-successfull' });
    this.router.navigate(['/pages/dialog-box']);
  }
  
  checkCardType(event: any) {
    this.cardType = this.creditCardType(this.newCardForm.value.card_no);
  }

  creditCardType(cc: string) {
    let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
    let mastercard = new RegExp('^5[1-5][0-9]{14}$');
    let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');
    let americanexpress = new RegExp('^3[47][0-9]{13}$');
    let discover = new RegExp('^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$');

    if (visa.test(cc)) {
      return 'VISA';
    }
    if (mastercard.test(cc) || mastercard2.test(cc)) {
      return 'MASTERCARD';
    }
    if (americanexpress.test(cc)) {
      return 'AMEX';
    }
    if (discover.test(cc)) {
      return 'DISCOVER';
    }
    return undefined;
  }

  onBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/pages/my-wallet']);
    }
  }

  canProcessTOPurchase(){
    if(this.selectedPaymentByOption == this.BY_WALLET){
      return true
    }
    else if(this.selectedPaymentByOption == this.BY_CREDIT_DEBIT_CARD && this.selectedCard){
      return true;
    }
    else if(this.selectedPaymentByOption == this.BY_BANK_TRANSFER && this.selectedAccount){
      return true;
    }
    return false
  }
}
