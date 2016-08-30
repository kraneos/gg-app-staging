import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ParseService } from './parse.service';
import { Role } from '../domain/role';

@Injectable()
export class RolesService {
  /**
   *
   */
  constructor(private parseService: ParseService) {

  }

  query(params: RolesQueryOptions): Observable<Role[]> {
    let url = 'roles?where={"name":"' + params.name + '"}';
    return this.parseService.get(url)
      .map(this.parseService.extractArray)
      .catch(this.parseService.handleError);
  }

  addUser(objId: string, userId: string): Observable<Response> {
    let url = 'roles/' + objId;
    let body = {
      users: {
        __op: 'AddRelation',
        objects: [{
          __type: 'Pointer',
          className: '_User',
          objectId: userId
        }]
      }
    };
    return this.parseService.put(url, body)
      .map(this.parseService.extractObject)
      .catch(this.parseService.handleError);
  }
}

export class RolesQueryOptions {
  name: string;
}
