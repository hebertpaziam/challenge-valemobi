import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

import { AuthenticationService } from './../../auth/shared/authentication.service';
import { Skate } from './skate.model';

@Injectable()
export class SkateService {

    private options = { headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authenticationService.bearerToken}`}), withCredentials: true };
    private appUrl = "http://localhost:5000"

    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }

    getSkate(id: number): Promise<Skate> {
        return this.http.get(`${this.appUrl}/skate/${id}`, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    getSkates(): Promise<string> {
        return this.http.get(`${this.appUrl}`, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }


    addSkate(skate: Skate): Promise<Skate> {
        return this.http.post(this.appUrl, JSON.stringify(skate), this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    removeSkate() {

    }



    ///////////////////////////////////////////////     UTILS     //////////////////////////////////////////////////////////////////////
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }

}
