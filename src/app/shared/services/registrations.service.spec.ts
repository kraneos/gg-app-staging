/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegistrationsService } from './registrations.service';

describe('Service: Registrations', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationsService]
    });
  });

  it('should ...', inject([RegistrationsService], (service: RegistrationsService) => {
    expect(service).toBeTruthy();
  }));
});
