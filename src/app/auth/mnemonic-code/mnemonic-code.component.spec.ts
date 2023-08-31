import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnemonicCodeComponent } from './mnemonic-code.component';

describe('MnemonicCodeComponent', () => {
  let component: MnemonicCodeComponent;
  let fixture: ComponentFixture<MnemonicCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MnemonicCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MnemonicCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
