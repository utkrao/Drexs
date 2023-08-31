import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDrecsAlertComponent } from './generate-drecs-alert.component';

describe('GenerateDrecsAlertComponent', () => {
  let component: GenerateDrecsAlertComponent;
  let fixture: ComponentFixture<GenerateDrecsAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateDrecsAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateDrecsAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
