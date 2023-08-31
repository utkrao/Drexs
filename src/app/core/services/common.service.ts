import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  toggleWallet: boolean;
  popupEvent = new EventEmitter();
  modalEvent = new EventEmitter();
  loaderEvent = new EventEmitter();
  constructor() { }

  toggleModal(data: any) {
    this.modalEvent.emit(data);
  }

  togglePopup(data: any) {
    this.popupEvent.emit(data);
  }

  toggleLoader(data: any) {
    this.loaderEvent.emit(data);
  }
}
