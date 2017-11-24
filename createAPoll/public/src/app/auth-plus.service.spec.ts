import { TestBed, inject } from '@angular/core/testing';

import { AuthPlusService } from './auth-plus.service';

describe('AuthPlusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthPlusService]
    });
  });

  it('should be created', inject([AuthPlusService], (service: AuthPlusService) => {
    expect(service).toBeTruthy();
  }));
});
