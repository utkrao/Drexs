import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSwapComponent } from './review-swap.component';

describe('ReviewSwapComponent', () => {
  let component: ReviewSwapComponent;
  let fixture: ComponentFixture<ReviewSwapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSwapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
