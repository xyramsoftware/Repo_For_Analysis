import { TestBed } from '@angular/core/testing';

import { ReferfriendService } from './referfriend.service';

describe('ReferfriendService', () => {
  let service: ReferfriendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferfriendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
