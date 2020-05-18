import { TestBed, async, inject } from '@angular/core/testing';

import { LicensesGuardGuard } from './licenses-guard.guard';

describe('LicensesGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LicensesGuardGuard]
    });
  });

  it('should ...', inject([LicensesGuardGuard], (guard: LicensesGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
