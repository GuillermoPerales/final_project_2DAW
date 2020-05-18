import { TestBed, async, inject } from '@angular/core/testing';

import { AdminUsersGuard } from './admin-users.guard';

describe('AdminUsersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminUsersGuard]
    });
  });

  it('should ...', inject([AdminUsersGuard], (guard: AdminUsersGuard) => {
    expect(guard).toBeTruthy();
  }));
});
