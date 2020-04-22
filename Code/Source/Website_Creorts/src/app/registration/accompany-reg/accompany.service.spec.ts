import { TestBed } from '@angular/core/testing';

import { AccompanyService } from './accompany.service';

describe('AccompanyService', () => {
  let service: AccompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
