import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackingHistoryComponent } from './stacking-history.component';

describe('StackingHistoryComponent', () => {
  let component: StackingHistoryComponent;
  let fixture: ComponentFixture<StackingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackingHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
