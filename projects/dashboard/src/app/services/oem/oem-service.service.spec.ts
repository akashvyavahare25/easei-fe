import { TestBed } from '@angular/core/testing';

import { OemService } from './oem-service.service';

describe('OemServiceService', () => {
  let service: OemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
