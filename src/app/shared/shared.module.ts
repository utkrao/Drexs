import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { WebviewDirective } from './directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { ModalComponent } from './components/modal/modal.component';
import { PopupComponent } from './components/popup/popup.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NumberDirective } from './directives/numbers-only.directive';
import { PaginationComponent } from './components/pagination/pagination.component'
import { NgSelectModule } from '@ng-select/ng-select';
import { BackLinkComponent } from './components/back-link/back-link.component';
import { DigitStringPipe } from './pipes/digit-string.pipe'

@NgModule({
  declarations: [WebviewDirective, DialogBoxComponent, ModalComponent, PopupComponent, LoaderComponent, NumberDirective, PaginationComponent, BackLinkComponent, DigitStringPipe],
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, NgxQRCodeModule, NgSelectModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, ModalComponent, PopupComponent, LoaderComponent, NumberDirective, PaginationComponent, BackLinkComponent, DigitStringPipe]
})
export class SharedModule { }
