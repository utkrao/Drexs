import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletProtectComponent } from './wallet-protect.component';

describe('WalletProtectComponent', () => {
  let component: WalletProtectComponent;
  let fixture: ComponentFixture<WalletProtectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletProtectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletProtectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
