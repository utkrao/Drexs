import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';
import * as _ from 'lodash';
import * as bip39 from 'bip39';
import { ElectronService, StorageService, UserService } from '../../core/services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserType } from '../../core/interfaces';
@Component({
  selector: 'app-mnemonic-code',
  templateUrl: './mnemonic-code.component.html',
  styleUrls: ['./mnemonic-code.component.scss']
})
export class MnemonicCodeComponent implements OnInit {
  state: string;
  code: string;
  codeArrayCopy: string[];
  codeArray: string[];
  shuffleCode: string[];
  putCode: string[];
  written: boolean;
  dragFrom: string;
  loading: boolean;
  create: string;
  isVerified: boolean = false;

  walletType: keyof typeof UserType;
  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private electronService: ElectronService,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {
    this.state = 'intro';
  }

  ngOnInit(): void {
    this.create = bip39.generateMnemonic();
    this.walletType = this.storageService.get('wallet-type');
  }

  createCode() {
    this.state = 'create';
    this.code = this.create;
    this.codeArray = this.create.split(' ');
    this.codeArrayCopy  = Object.assign([], this.codeArray);
  }

  shuffle(array) {
    let currentIndex = array.length; let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  verifyCode() {
    this.state = 'verify';
    this.shuffleCode = this.shuffle(this.codeArray);
    // this.shuffleCode = this.codeArray;
    this.putCode = this.shuffleCode.map(item => (undefined));
  }

  back() {
    this.state = 'intro';
    this.written = false;
  }

  startOver() {
    this.codeArray  = Object.assign([], this.codeArrayCopy);
    this.isVerified = false;
    this.verifyCode();
  }

  checked() {
    this.written = !this.written;
  }

  async confirmCode() {
    this.loading = true;
    const result = _.isEqual(this.code.split(' '), this.putCode);
    if (result) {
      const crypto = await this.electronService.ipcRenderer.invoke('get-crypto-keys', this.code);
      this.storageService.set('keys', crypto);
      const signup_data = this.storageService.get('signup-form-data');
      const wallet_data = this.storageService.get('wallet-form-data');
      this.userService.signup({
        email: signup_data.email,
        phone : signup_data.phone ? signup_data.phone['e164Number']:null,
        emailVerified: signup_data.email ? true : false,
        name: `${signup_data.firstname} ${signup_data.lastname}`,
        password: wallet_data.password,
        userType: this.walletType,
        publicKeys: {
          BTC: crypto.BTC.publicKey,
          ETH: crypto.ETH.publicKey,
          WATT: crypto.WATT.publicKey,
          DREXS: crypto.DREXS.publicKey,
        }
      }).subscribe({
        next: (response) => {
          if (response.status) {
            this.storageService.set('logged', true);
            this.storageService.set('signup-id', response.id);
            this.storageService.remove('dialog-box-data');
            this.storageService.set('dialog-box-data', { type: 'signup-complete' });
            this.loading = false;
            this.isVerified = true;
            // this.toastr.success('Mnemonic order verified')
            // this.router.navigate(['/dialog-box']);
          }
        },
        error: (e) => {
          console.log("Error: ", e);
          this.loading = false;
          // this.toastr.error(e?.error?.message);
        }
      })
    } else {
      this.loading = false;
      let isAllSelected = true;
      this.putCode.forEach((ele)=>{
        if(!ele){
          isAllSelected = false
        }
      });

      if(isAllSelected){
        this.toastr.error('Code does not match.');
      }
      else{
        this.toastr.error('Please fill the required field.');
      }
    }
  }
  
  goToNext(){
    this.router.navigate(['/dialog-box']);
  }

  onDrop(event: DndDropEvent) {
    const element = event.event.target as HTMLElement;
    if (this.dragFrom === 'drag-zone-area' && this.putCode[element.parentElement.id]) {
      return
    }
    if (this.dragFrom === 'drop-zone-area' && element.id) {
      const newData = this.putCode[event.data.index];
      this.putCode[event.data.index] = this.putCode[element.id];
      this.putCode[element.id] = newData;
    } else if (this.dragFrom === 'drop-zone-area' && element.parentElement.id) {
      const newData = this.putCode[event.data.index];
      this.putCode[event.data.index] = this.putCode[element.parentElement.id];
      this.putCode[element.parentElement.id] = newData;
    } else {
      if(this.putCode[element.id]){
        this.shuffleCode.push(this.putCode[element.id]);
      }
      this.putCode[element.id] = event.data.name;
      this.shuffleCode.splice(event.data.index, 1);
    }
    this.cd.detectChanges();
  }

  onDragStart(event: DragEvent) {
    const element = event.target as HTMLElement;
    this.dragFrom = element.classList.contains('drop-zone-area') ? 'drop-zone-area' : 'drag-zone-area';
  }
}
