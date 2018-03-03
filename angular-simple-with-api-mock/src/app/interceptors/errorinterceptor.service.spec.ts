import { TestBed, inject } from '@angular/core/testing';

import { ErrorinterceptorService } from './errorinterceptor.service';

describe('ErrorinterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorinterceptorService]
    });
  });

  it('should be created', inject([ErrorinterceptorService], (service: ErrorinterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
