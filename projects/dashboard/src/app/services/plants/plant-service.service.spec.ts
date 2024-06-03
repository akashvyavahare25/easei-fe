import { TestBed } from '@angular/core/testing';

import { PlantServiceService } from './plant-service.service';

describe('PlantServiceService', () => {
  let service: PlantServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
