import { TestBed, inject } from '@angular/core/testing';

import { LoginResolveService } from './login-resolve.service';

describe('LoginResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginResolveService]
    });
  });

  it('should be created', inject([LoginResolveService], (service: LoginResolveService) => {
    expect(service).toBeTruthy();
  }));
});
