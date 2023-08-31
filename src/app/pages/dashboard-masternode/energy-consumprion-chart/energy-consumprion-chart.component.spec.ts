import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyConsumprionChartComponent } from './energy-consumprion-chart.component';

describe('EnergyConsumprionChartComponent', () => {
  let component: EnergyConsumprionChartComponent;
  let fixture: ComponentFixture<EnergyConsumprionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyConsumprionChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyConsumprionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
