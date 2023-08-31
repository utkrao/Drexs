import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../core/services';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  type: string;
  payload: any;
  constructor(
    private router: Router,
    private storage: StorageService,
  ) {
  }

  ngOnInit(): void {
    const { type, payload } = this.storage.get('dialog-box-data');
    this.type = type;
    this.payload = payload;
  }

  navigate(url: string) {
    this.router.navigate([url])
  }

}
