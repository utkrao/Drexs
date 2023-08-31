import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CardService, StorageService } from '../../../core/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loading : boolean = true;
  cardLoading : boolean = false;

  kycVerified :boolean = false;
  userProfile : any = {};
  walletType : string;

  savedCardList: Array<any> = [];

  currentTab : number = 1 ;
  constructor(
    private storage: StorageService,
    private card: CardService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {

    this.getProfileData();
    this.getSavedCardList();

  }


    getProfileData(){
      this.loading = true;
      this.userProfile = this.storage.get('profile');
      this.kycVerified = this.storage.get('kycVerified');
      this.walletType = this.storage.get('wallet-type');

      this.loading = false;
    }

    getSavedCardList() {

      this.cardLoading = true;
      this.card.getCardList().subscribe({
        next: (response) => {
          this.savedCardList = response.data;
          this.cardLoading = false;
        },
        error: (e) => {
          this.cardLoading = false;
        }
      })
  
    }

    removeCard(cardObj){

      this.cardLoading = true;

      let user = this.storage.get('user');

      const formData = {
        cardId : cardObj.cardId,
        userId : user['id'],
      }
      this.card.removeCard(formData).subscribe({
        next: (response) => {
          this.getSavedCardList();
        },
        error: (e) => {
          console.log("Error: ", e);
          this.cardLoading = false;
        }
      })

    }


}
