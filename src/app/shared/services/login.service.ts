import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ParseService } from './parse.service';
import { CurrentUser } from '../domain/current-user';

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

  private extractLoginData(res: Response) {
    let body = res.json();
    return body || {};
  }
}
