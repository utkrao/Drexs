import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDrecsComponent } from './my-drecs.component';

describe('MyDrecsComponent', () => {
  let component: MyDrecsComponent;
  let fixture: ComponentFixture<MyDrecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDrecsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDrecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
