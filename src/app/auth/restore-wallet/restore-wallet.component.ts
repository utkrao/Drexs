import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElectronService, StorageService, UserService } from '../../core/services';

@Component({
  selector: 'app-restore-wallet',
  templateUrl: './restore-wallet.component.html',
  styleUrls: ['./restore-wallet.component.scss']
})
export class RestoreWalletComponent implements OnInit {
  code: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
  }
  value: string;
  loading: boolean;
  constructor(
    private storageService: StorageService,
    private electronService: ElectronService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
  ) {
    this.code = {} as {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      7: string;
      8: string;
      9: string;
      10: string;
      11: string;
      12: string;
    }
  }

  ngOnInit(): void {
  }

  change(event, num: number) {
    this.code[num] = event?.target?.value;
  }

  async confirm() {
    const code = Object.keys(this.code).map(key => this.code[key]);
    if (code.join(' ')) {
      this.loading = true;
      const crypto = await this.electronService.ipcRenderer.invoke('get-crypto-keys', code.join(' '));
      const walletType = this.storageService.get('wallet-type');
      this.userService.restoreWallet({ BTC: crypto.BTC.publicKey }, walletType)
        .subscribe({
          next: (response: any) => {
            this.storageService.set('keys', crypto);
            this.loading = false;
            this.storageService.set('signup-id', response?.id);
            this.router.navigate(['/auth/reset-pin']);
          },
          error: (e) => {
            console.log("Error: ", e);
            this.loading = false;
            // this.toastr.error(e?.error?.message);
          }
        })
    } else {
      this.toastr.error('Mnemonic code is required');
    }
  }

  startOver() {
    Object.keys(this.code).forEach(key => {
      document.getElementsByTagName('input').item(Number(key) - 1).value = '';
    })
    this.code = {} as {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      7: string;
      8: string;
      9: string;
      10: string;
      11: string;
      12: string;
    }
  }
}
