import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBidsComponent } from './current-bids.component';

describe('CurrentBidsComponent', () => {
  let component: CurrentBidsComponent;
  let fixture: ComponentFixture<CurrentBidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentBidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
