import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import { ParseService } from './parse.service';

import { CurrentUser } from '../domain/current-user';
import { User } from '../domain/user';
import { SegguClient } from '../domain/seggu-client';
import { Role } from '../domain/role';

@Injectable()
export class LoginService {
  /**
   *
   */
  constructor(private parseService: ParseService) {

  }

  login(username, password): Observable<CurrentUser> {
    return this.parseService
      .get('login?username=' + username + '&password=' + password)
      .map(this.extractLoginData)
      .catch(this.parseService.handleError);
  }

  logout(): Observable<Response> {
    return this.parseService
      .post('logout', null)
      .catch(this.parseService.handleError);
  }

  getUser(): Observable<User> {
    return this.parseService
      .get('users/me?include=segguClient')
      .map(this.parseService.extractObject)
      .catch(this.parseService.handleError);
  }

  getSegguClient(objId: string): Observable<SegguClient> {
    return this.parseService
      .get('classes/SegguClient/' + objId)
      .map(this.parseService.extractObject)
      .catch(this.parseService.handleError);
  }

  getRolesBySegguClient(segguClient: SegguClient): Observable<Role[]> {
    let url = 'roles';
    url = url + '?where={"name":{"$regex":"' + segguClient.name + '"}}';
    return this.parseService
      .get(url)
      .map(this.parseService.extractArray)
      .catch(this.parseService.handleError);
  }

  getRolesByUser(objId: string): Observable<Role[]> {
    let url = 'roles';
    url = url + '?where={"users": {"$in": [{"__type": "Pointer","className": "users","objectId": "' + objId + '"}]}}';
    return this.parseService
      .get(url)
      .map(this.parseService.extractArray)
      .catch(this.parseService.handleError);
  }

  private extractLoginData(res: Response) {
    let body = res.json();
    return body || {};
  }
}
