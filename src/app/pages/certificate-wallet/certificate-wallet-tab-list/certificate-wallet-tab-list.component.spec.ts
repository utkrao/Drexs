import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateWalletTabListComponent } from './certificate-wallet-tab-list.component';

describe('CertificateWalletTabListComponent', () => {
  let component: CertificateWalletTabListComponent;
  let fixture: ComponentFixture<CertificateWalletTabListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateWalletTabListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateWalletTabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
