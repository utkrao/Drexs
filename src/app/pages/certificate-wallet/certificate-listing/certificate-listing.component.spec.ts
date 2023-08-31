import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateListingComponent } from './certificate-listing.component';

describe('CertificateListingComponent', () => {
  let component: CertificateListingComponent;
  let fixture: ComponentFixture<CertificateListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
