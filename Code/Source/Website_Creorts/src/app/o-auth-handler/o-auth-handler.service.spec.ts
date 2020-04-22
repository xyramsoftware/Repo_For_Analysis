import { TestBed } from '@angular/core/testing';

import { OAuthHandlerService } from './o-auth-handler.service';

describe('OAuthHandlerService', () => {
  let service: OAuthHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OAuthHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
