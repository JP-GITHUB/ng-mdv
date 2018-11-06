import { TestBed } from '@angular/core/testing';

import { BranchOfficeService } from './branch-office.service';

describe('BranchOfficeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BranchOfficeService = TestBed.get(BranchOfficeService);
    expect(service).toBeTruthy();
  });
});
