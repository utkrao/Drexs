import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsHistoryComponent } from './earnings-history.component';

describe('EarningsHistoryComponent', () => {
  let component: EarningsHistoryComponent;
  let fixture: ComponentFixture<EarningsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
