import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { formCanDeactivateGuard } from './form-can-deactivate.guard';

describe('formCanDeactivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formCanDeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
