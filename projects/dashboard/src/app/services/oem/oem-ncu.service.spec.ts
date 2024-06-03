import { TestBed } from '@angular/core/testing';

import { OemNcuService } from './oem-ncu.service';

describe('OemNcuService', () => {
  let service: OemNcuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OemNcuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
