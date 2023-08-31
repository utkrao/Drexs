import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyOffsetStatisticsChartComponent } from './energy-offset-statistics-chart.component';

describe('EnergyOffsetStatisticsChartComponent', () => {
  let component: EnergyOffsetStatisticsChartComponent;
  let fixture: ComponentFixture<EnergyOffsetStatisticsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyOffsetStatisticsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyOffsetStatisticsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
