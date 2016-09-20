import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { environment } from '../../../environments/environment';

import { CurrentUserService } from './current-user.service';

@Injectable()
export class ParseService {
    /**
     *
     */
    constructor(private http: Http, private currentUserService: CurrentUserService) {
    }
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.get(this.getUrl(url), this.getOptions(options));
    }
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.post(this.getUrl(url), this.applyACL(body), this.getOptions(options));
    }
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.put(this.getUrl(url), body, this.getOptions(options));
    }
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.delete(this.getUrl(url), this.getOptions(options));
    }
    extractArray(res: Response) {
        let body = res.json();
        return body.results || [];
    }
    extractObject(res: Response) {
        let body = res.json();
        return body || {};
    }
    handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
    private getUrl(url: string): string {
        return environment.parseUrl + url;
    }
    private getOptions(options?: RequestOptionsArgs) {
        let opts = options || new RequestOptions({ headers: new Headers() });
        opts.headers.append('X-Parse-Application-Id', environment.parseAppId);
        let userStr = localStorage.getItem('segguUser');
        let user = JSON.parse(userStr);
        if (user) {
            opts.headers.append('X-Parse-Session-Token', user.sessionToken);
        }
        return opts;
    }
    private applyACL(body: any) {
        let postACL = this.currentUserService.getPostACL();

        if (postACL && body) {
            body.ACL = postACL;
        }

        return body;
    }
}
