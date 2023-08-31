import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetAssetResponse } from '../../../core/interfaces';
import { CommonService, StorageService, UserService } from '../../../core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit, OnDestroy {

  toggleWallet: boolean;
  walletAssetList: GetAssetResponse;
  loading: boolean;
  constructor(
    private router: Router,
    private common: CommonService,
    private userService: UserService,
    private toastr: ToastrService,
    private storage: StorageService,
    private route: ActivatedRoute
  ) {
    this.walletAssetList = {} as GetAssetResponse;
    if (this.router.url.includes('wallet')) {
      this.toggleWallet = true;
    } else {
      this.toggleWallet = false;
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getWalletBalance().subscribe({
      next: (response) => {
        if (response.success) {
          this.walletAssetList = response;
          this.loading = false;
          this.checkPrevious();
        }
      },
      error: (e) => {
        this.loading = false;
        // this.toastr.error('Error occured on fetching data of wallet assets')
      }
    })
  }

  checkPrevious(){
    this.route.queryParams.subscribe(params => {
      if (params.action === 'send') {
        if(this.storage.get('send-action-data')){
          const { type, coinAsset } = this.storage.get('send-action-data');
          this.send(type,coinAsset);
        }
      }
      else if (params.action === 'buy') {
        if(this.storage.get('buy-action-data')){
          const { type} = this.storage.get('buy-action-data');
          this.buy(type);
        }
      }
      else if (params.action === 'receive') {
        if(this.storage.get('receive-action-data')){
          const { type } = this.storage.get('receive-action-data');
          this.receive(type);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.closeModal();
  }

  send(type: string, coinAsset: any) {
    this.storage.set('send-action-data',{'type':type, 'coinAsset': coinAsset})
    this.common.toggleModal({ show: true, type: type,  coinAsset: coinAsset, action: 'send', walletList: this.walletAssetList });
  }

  buy(type: string) {
    this.router.navigate(['/pages/marketplace']);
    // this.storage.set('buy-action-data',{'type':type})
    // this.common.toggleModal({ show: true, type: type, action: 'buy', walletList: this.walletAssetList });
  }

  receive(type: string) {
    this.storage.set('receive-action-data',{'type':type})
    this.common.toggleModal({ show: true, type: type, action: 'receive' });
  }

  closeModal() {
    this.common.toggleModal({ show: false});
  }


}
