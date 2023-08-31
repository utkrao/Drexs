import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakingActivitiesComponent } from './staking-activities.component';

describe('StakingActivitiesComponent', () => {
  let component: StakingActivitiesComponent;
  let fixture: ComponentFixture<StakingActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakingActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakingActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
