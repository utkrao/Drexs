import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCertificateFilterComponent } from './my-certificate-filter.component';

describe('MyCertificateFilterComponent', () => {
  let component: MyCertificateFilterComponent;
  let fixture: ComponentFixture<MyCertificateFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCertificateFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCertificateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
