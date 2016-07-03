import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HomeOptions } from '../../home/home-options';
import { Employee } from '../domain/employee';
import { ParseService } from './parse.service';

@Injectable()
export class EmployeesService {
    /**
     *
     */
    constructor(private parseService: ParseService) {
    }

    query(policyId): Observable<Employee[]> {
        let url = 'classes/Employee?where={"policy":{"__type":"Pointer","className":"Policy","objectId":"' + policyId + '"}}';
        url = url + '' ;
        return this.parseService
            .get(url)
            .map(this.parseService.extractArray)
            .catch(this.parseService.handleError);
    }
}