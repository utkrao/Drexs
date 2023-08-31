import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSendComponent } from './review-send.component';

describe('ReviewSendComponent', () => {
  let component: ReviewSendComponent;
  let fixture: ComponentFixture<ReviewSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
