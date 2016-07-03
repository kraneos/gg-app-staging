import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HomeOptions } from '../../home/home-options';
import { Integral } from '../domain/integral';
import { ParseService } from './parse.service';

@Injectable()
export class IntegralsService {
    /**
     *
     */
    constructor(private parseService: ParseService) {
    }

    query(policyId): Observable<Integral[]> {
        let url = 'classes/Integral?where={"policy":{"__type":"Pointer","className":"Policy","objectId":"' + policyId + '"}}';
        url = url + '' ;
        return this.parseService
            .get(url)
            .map(this.parseService.extractArray)
            .catch(this.parseService.handleError);
    }
}