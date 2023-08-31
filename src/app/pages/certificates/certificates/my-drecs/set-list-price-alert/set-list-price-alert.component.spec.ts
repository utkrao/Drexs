import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetListPriceAlertComponent } from './set-list-price-alert.component';

describe('SetListPriceAlertComponent', () => {
  let component: SetListPriceAlertComponent;
  let fixture: ComponentFixture<SetListPriceAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetListPriceAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetListPriceAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
