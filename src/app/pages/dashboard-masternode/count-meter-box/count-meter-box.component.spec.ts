import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountMeterBoxComponent } from './count-meter-box.component';

describe('CountMeterBoxComponent', () => {
  let component: CountMeterBoxComponent;
  let fixture: ComponentFixture<CountMeterBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountMeterBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountMeterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
