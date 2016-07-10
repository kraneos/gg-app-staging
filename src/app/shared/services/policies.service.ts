import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PoliciesOptions } from '../../policies/policies-options';
import { Policy } from '../domain/policy';
import { ParseService } from './parse.service';

@Injectable()
export class PoliciesService {
    /**
     *
     */
    constructor(private parseService: ParseService) {
    }

    query(opts: PoliciesOptions): Observable<Policy[]> {
        let url = 'classes/Policy?skip=' + (+opts.limit * (opts.page - 1)) + '&limit=' + opts.limit;
        url = url + '&include=client,risk';
        return this.parseService
            .get(url)
            .map(this.parseService.extractArray)
            .catch(this.parseService.handleError);
    }

    get(id: string): Observable<Policy> {
        let url = 'classes/Policy/' + id;
        url = url + '?include=risk.company,client';
        return this.parseService
            .get(url)
            .map(this.parseService.extractObject)
            .catch(this.parseService.handleError);
    }
}
