import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionConfirmationAlertComponent } from './action-confirmation-alert.component';

describe('ActionConfirmationAlertComponent', () => {
  let component: ActionConfirmationAlertComponent;
  let fixture: ComponentFixture<ActionConfirmationAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionConfirmationAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionConfirmationAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
