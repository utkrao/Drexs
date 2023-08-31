import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsChartComponent } from './rewards-chart.component';

describe('RewardsChartComponent', () => {
  let component: RewardsChartComponent;
  let fixture: ComponentFixture<RewardsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
