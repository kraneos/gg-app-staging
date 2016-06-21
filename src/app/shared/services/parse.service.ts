import { Injectable } from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response, ConnectionBackend, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CurrentUser } from '../domain/current-user';

@Injectable()
export abstract class ParseService {
    user: CurrentUser;
    /**
     *
     */
    constructor(private http: Http) {
        let userStr = localStorage.getItem('segguUser');
        this.user = JSON.parse(userStr);
    }
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.get(this.getUrl(url), this.getOptions(options));
    }
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.post(this.getUrl(url), body, this.getOptions(options));
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
    handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
    private getUrl(url: string): string {
        return 'https://seggu-api-develop.herokuapp.com/parse/' + url;
    }
    private getOptions(options?: RequestOptionsArgs) {
        var opts = options || new RequestOptions({ headers: new Headers() });
        opts.headers.append('X-Parse-Application-Id', 'seggu-api');
        if (this.user) {
            opts.headers.append('X-Parse-Session-Token', this.user.sessionToken);
        }
        return opts;
    }
}