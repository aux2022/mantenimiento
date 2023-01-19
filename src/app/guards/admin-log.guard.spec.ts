import { TestBed } from '@angular/core/testing';

import { AdminLogGuard } from './admin-log.guard';

describe('AdminLogGuard', () => {
  let guard: AdminLogGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminLogGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
