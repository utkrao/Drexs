import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService, StorageService, UserService } from '../../../core/services';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { BeneficialListing, BeneficialUser } from '../../../core/interfaces';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  isShow: boolean;
  type: string;
  coinCode: string;
  term: string;
  sort: string;
  count: number;
  userListing: Array<BeneficialUser> ;
  termSub = new Subject<string>();
  loading: boolean;
  constructor(
    private common: CommonService,
    private userService: UserService,
    private storage: StorageService,
  ) {
    this.term = '';
    this.termSub.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        this.term = value
        this.getList(value, this.sort);
      })
  }

  ngOnInit(): void {
    this.common.popupEvent.subscribe((data) => {
      this.isShow = data.show;
      this.type = data.type;
      this.coinCode = data.coinCode;
      this.getList('', '');
    })
  }

  changeSorting(event) {
    this.sort = event.target.value;
    if (this.sort === 'asc') {
      this.getList(this.term, 'asc');
    } else if (this.sort === 'desc') {
      this.getList(this.term, 'desc');
    } else {
      this.getList(this.term, '');
    }
  }

  close() {
    this.common.togglePopup({ show: false });
  }

  getList(term: string, sort: string) {
    this.loading = true;
    this.userService.getBeneficiaryList({ coinCode: this.coinCode, search: term, sort }).subscribe({
      next: (response) => {
        this.count = response.data.count;
        this.userListing = response.data;
        this.loading = false;
      },
      error: (e) => {
        console.log("Error: ",e);
        this.loading = false;
      }
    })
  }

  removeUser(user) {
    this.userService.removeUser({ coinCode: this.coinCode, address: user.beneficiaryAddress }).subscribe({
      next: (response) => {
        this.getList('', '');
      },
      error: (e) => {
        console.log("Error: ",e);
      }
    })
  }

  selectUser(user) {
    this.storage.set('popup-select-user', user);
    this.common.togglePopup({ show: false });
  }

}
