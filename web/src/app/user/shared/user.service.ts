import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

import { AuthenticationService } from './../../auth/shared/authentication.service';
import { User } from './user.model';

@Injectable()
export class UserService {

    private options = { headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authenticationService.accessToken}`}), withCredentials: true };
    private appUrl = "http://localhost:5000/api"

    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }

    getUser(id: number): Promise<User> {
        return this.http.get(`${this.appUrl}/user/${id}`, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    getUsers(): Promise<string> {
        return this.http.get(`${this.appUrl}`, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }


    addUser(user: User): Promise<User> {
        return this.http.post(this.appUrl, JSON.stringify(user), this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    removeUser() {

    }



    ///////////////////////////////////////////////     UTILS     //////////////////////////////////////////////////////////////////////
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
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
