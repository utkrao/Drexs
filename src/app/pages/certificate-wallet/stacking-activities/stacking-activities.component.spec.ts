import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackingActivitiesComponent } from './stacking-activities.component';

describe('StackingActivitiesComponent', () => {
  let component: StackingActivitiesComponent;
  let fixture: ComponentFixture<StackingActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackingActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackingActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
