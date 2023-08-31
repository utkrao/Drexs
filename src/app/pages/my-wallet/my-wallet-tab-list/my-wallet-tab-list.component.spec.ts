import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWalletTabListComponent } from './my-wallet-tab-list.component';

describe('MyWalletTabListComponent', () => {
  let component: MyWalletTabListComponent;
  let fixture: ComponentFixture<MyWalletTabListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyWalletTabListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWalletTabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
