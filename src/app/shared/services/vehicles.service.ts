import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HomeOptions } from '../../home/home-options';
import { Vehicle } from '../domain/vehicle';
import { ParseService } from './parse.service';

@Injectable()
export class VehiclesService {
    /**
     *
     */
    constructor(private parseService: ParseService) {
    }

    query(policyId): Observable<Vehicle[]> {
        let url = 'classes/Vehicle?where={"policy":{"__type":"Pointer","className":"Policy","objectId":"' + policyId + '"}}';
        url = url + '&include=vehicleModel' ;
        return this.parseService
            .get(url)
            .map(this.parseService.extractArray)
            .catch(this.parseService.handleError);
    }
}