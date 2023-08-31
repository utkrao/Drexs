import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCollectiblesComponent } from './my-collectibles.component';

describe('MyCollectiblesComponent', () => {
  let component: MyCollectiblesComponent;
  let fixture: ComponentFixture<MyCollectiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCollectiblesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCollectiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
