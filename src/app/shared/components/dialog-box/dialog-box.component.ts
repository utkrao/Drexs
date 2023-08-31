import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogBox, UserType } from '../../../core/interfaces';
import { StorageService } from '../../../core/services';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  type: string;
  payload: any;
  userName : string;
  walletType: string;
  UserType = UserType;

  constructor(
    private router: Router,
    private storage: StorageService,
  ) {
  }

  ngOnInit(): void {
    const { type, payload } = this.storage.get('dialog-box-data');
    this.userName = this.storage.get('user-name');

    this.type = type;
    this.payload = payload;
    const walletType = this.storage.get('wallet-type');

  }

  navigate(url: string) {
    this.router.navigate([url])
  }

}
