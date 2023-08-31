import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMasternodeComponent } from './dashboard-masternode.component';

describe('DashboardMasternodeComponent', () => {
  let component: DashboardMasternodeComponent;
  let fixture: ComponentFixture<DashboardMasternodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMasternodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMasternodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
