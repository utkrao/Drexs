import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeSummaryComponent } from './stake-summary.component';

describe('StakeSummaryComponent', () => {
  let component: StakeSummaryComponent;
  let fixture: ComponentFixture<StakeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
