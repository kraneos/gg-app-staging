/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PoliciesService } from './policies.service';

describe('Service: Policies', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoliciesService]
    });
  });

  it('should ...', inject([PoliciesService], (service: PoliciesService) => {
    expect(service).toBeTruthy();
  }));
});
