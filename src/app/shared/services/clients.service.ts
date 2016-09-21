import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ParseService } from './parse.service';

import { Client } from '../domain/client';

@Injectable()
export class ClientsService {

  constructor(
    private parseService: ParseService
  ) { }

  get(id: string): Observable<Client> {
    let url = 'classes/Client/' + id;
    return this.parseService
      .get(url)
      .map(this.parseService.extractObject)
      .catch(this.parseService.handleError);
  }
}
