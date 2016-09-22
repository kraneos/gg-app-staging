/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProducersService } from './producers.service';

describe('Service: Producers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProducersService]
    });
  });

  it('should ...', inject([ProducersService], (service: ProducersService) => {
    expect(service).toBeTruthy();
  }));
});
