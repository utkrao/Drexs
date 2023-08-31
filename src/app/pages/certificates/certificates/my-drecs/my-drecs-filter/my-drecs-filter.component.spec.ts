import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDrecsFilterComponent } from './my-drecs-filter.component';

describe('MyDrecsFilterComponent', () => {
  let component: MyDrecsFilterComponent;
  let fixture: ComponentFixture<MyDrecsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDrecsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDrecsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
