import { TestBed } from '@angular/core/testing';

import { PowerManagementService } from './power-management.service';

describe('PowerManagementService', () => {
  let service: PowerManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
