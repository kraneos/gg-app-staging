/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IntegralsService } from './integrals.service';

describe('Service: Integrals', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntegralsService]
    });
  });

  it('should ...', inject([IntegralsService], (service: IntegralsService) => {
    expect(service).toBeTruthy();
  }));
});
