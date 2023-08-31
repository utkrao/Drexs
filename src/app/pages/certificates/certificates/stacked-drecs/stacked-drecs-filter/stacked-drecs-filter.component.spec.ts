import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedDrecsFilterComponent } from './stacked-drecs-filter.component';

describe('StackedDrecsFilterComponent', () => {
  let component: StackedDrecsFilterComponent;
  let fixture: ComponentFixture<StackedDrecsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackedDrecsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedDrecsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
