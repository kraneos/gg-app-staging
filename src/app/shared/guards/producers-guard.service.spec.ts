/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProducersGuardService } from './producers-guard.service';

describe('Service: ProducersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProducersGuardService]
    });
  });

  it('should ...', inject([ProducersGuardService], (service: ProducersGuardService) => {
    expect(service).toBeTruthy();
  }));
});
