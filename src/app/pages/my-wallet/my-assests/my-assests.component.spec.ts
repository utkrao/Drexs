import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssestsComponent } from './my-assests.component';

describe('MyAssestsComponent', () => {
  let component: MyAssestsComponent;
  let fixture: ComponentFixture<MyAssestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAssestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAssestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
