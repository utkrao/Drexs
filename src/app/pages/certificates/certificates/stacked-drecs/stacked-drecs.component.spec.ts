import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedDrecsComponent } from './stacked-drecs.component';

describe('StackedDrecsComponent', () => {
  let component: StackedDrecsComponent;
  let fixture: ComponentFixture<StackedDrecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackedDrecsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedDrecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
