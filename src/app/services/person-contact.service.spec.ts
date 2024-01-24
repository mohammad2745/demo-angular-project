import { TestBed } from '@angular/core/testing';

import { PersonContactService } from './person-contact.service';

describe('PersonContactService', () => {
  let service: PersonContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
