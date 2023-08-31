import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreWalletComponent } from './restore-wallet.component';

describe('RestoreWalletComponent', () => {
  let component: RestoreWalletComponent;
  let fixture: ComponentFixture<RestoreWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoreWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
