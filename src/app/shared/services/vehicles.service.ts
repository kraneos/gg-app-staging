import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ParseService } from './parse.service';

import { Vehicle } from '../domain/vehicle';

@Injectable()
export class VehiclesService {

  constructor(
    private parseService: ParseService
  ) { }

  query(policyId): Observable<Vehicle[]> {
    let url = 'classes/Vehicle?where={"policy":{"__type":"Pointer","className":"Policy","objectId":"' + policyId + '"}}';
    url = url + '&include=vehicleModel';
    return this.parseService
      .get(url)
      .map(this.parseService.extractArray)
      .catch(this.parseService.handleError);
  }
}
