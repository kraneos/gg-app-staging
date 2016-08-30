import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ParseService } from './parse.service';
import { SegguClient } from '../domain/seggu-client';

@Injectable()
export class SegguClientsService {
  /**
   *
   */
  constructor(private parseService: ParseService) {

  }

  query(params: SegguClientsQueryOptions): Observable<SegguClient[]> {
    let url = 'classes/SegguClient?where{"name":{"$regex":"' + params.name + '"}}';
    return this.parseService.get(url)
      .map(this.parseService.extractArray)
      .catch(this.parseService.handleError);
  }

  get(objId: string): Observable<SegguClient> {
    let url = 'classes/SegguClient/' + objId;
    return this.parseService.get(url)
      .map(this.parseService.extractObject)
      .catch(this.parseService.handleError);
  }
}

export class SegguClientsQueryOptions {
  name: string;
}
