import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CurrentUser } from '../domain/current-user';
import { PasRegistrationUser } from '../domain/pas-registration-user';
import { RegistrationUser } from '../domain/registration-user';

import { CurrentUserService } from '../services/current-user.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class RegistrationsService {

  constructor(
    private http: Http,
    private currentUserService: CurrentUserService
  ) { }

  register(user: RegistrationUser): Observable<CurrentUser> {
    let url = environment.registrationUrl;
    return this.http.post(url, user)
      .map(res => {
        let body = res.json();
        return body || {};
      })
      .catch(error => {
        let errMsg = (error.message || error._body) ? error.message || error._body :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
      });
  }

  registerPas(user: PasRegistrationUser): Observable<CurrentUser> {
    let url = environment.pasRegistrationUrl;
    return this.http.post(url, user)
      .map(res => {
        return res;
      })
      .catch(error => {
        let errMsg = (error.message || error._body) ? error.message || error._body :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
      });
  }
}
