import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import { ParseService } from './parse.service';

import { Fee } from '../domain/fee';
import { HomeOptions } from '../domain/home-options';

@Injectable()
export class FeesService {
  /**
   *
   */
  constructor(
    private parseService: ParseService
  ) {
  }

  query(opts: HomeOptions): Observable<Fee[]> {
    let url = 'classes/Fee?skip=' + (+opts.limit * (opts.page - 1)) + '&limit=' + opts.limit;
    url = url + '&include=policy.client,policy.risk';
    url = url + '&order=expirationDate';
    if (opts.date) {
      let fromDate = new Date(opts.date.getFullYear(), opts.date.getMonth(), opts.date.getDate());
      fromDate.setUTCHours(0);
      let toDate = new Date(fromDate.valueOf());
      toDate.setDate(toDate.getDate() + 1);
      toDate.setUTCHours(0);
      url = url +
        '&where={"expirationDate":{"$gte":{"__type":"Date","iso":"' +
        fromDate.toJSON() +
        '"},"$lt":{"__type":"Date","iso":"' +
        toDate.toJSON() +
        '"}}}';
    }
    return this.parseService
      .get(url)
      .map(this.parseService.extractArray)
      .catch(this.parseService.handleError);
  }

  queryByPolicy(policyId: string): Observable<Fee[]> {
    let url = 'classes/Fee?where={"policy":{"__type":"Pointer","className":"Policy","objectId":"' + policyId + '"}}';
    url = url + '&order=expirationDate';
    return this.parseService
      .get(url)
      .map(this.parseService.extractArray)
      .catch(this.parseService.handleError);
  }

  get(feeId: string): Observable<Fee> {
    let url = 'classes/Fee/' + feeId;
    url = url + '?include=policy.client';
    return this.parseService
      .get(url)
      .map(this.parseService.extractObject)
      .catch(this.parseService.handleError);
  }

  put(objectId: string, fee: any): Observable<Response> {
    let url = 'classes/Fee/' + objectId;
    return this.parseService
      .put(url, fee)
      .catch(this.parseService.handleError);
  }
}
