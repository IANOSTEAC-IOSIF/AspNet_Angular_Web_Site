import { TestBed } from '@angular/core/testing';

import { ErrorInterceptorsService } from './error-interceptors.service';

describe('ErrorInterceptorsService', () => {
  let service: ErrorInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
