import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

import { User } from './../../user/shared/user.model';

@Injectable()
export class AuthenticationService {

	public authenticatedUser: User;
	public accessToken: string;

	private options = { headers: new Headers({ 'Content-Type': 'application/json' }), withCredentials: true };

	private appUrl = "http://localhost:5000/api";

	constructor(private http: Http, private router: Router) {
	}

	doLogin(user: User): Promise<void> {
		let body = {
			grant_type: "password",
			client_id: this.generateClientId(),
			client_secret: this.generateClientSecret(),
			username: user.username,
			password: user.password
		}
		return this.http.post(`${this.appUrl}/auth`, body, this.options)
			.toPromise()
			.then(res => {


				this.accessToken = this.extractData(res).access_token;

				if (user.username == "admin") user.name = "Administrador";

				this.authenticatedUser = user;

				localStorage.setItem('user', JSON.stringify(this.authenticatedUser));
				localStorage.setItem('access_token', JSON.stringify(this.accessToken));
			})
			.catch(this.handleError);
	}

	doLogout() {
		this.authenticatedUser = null;
		this.accessToken = null;
		localStorage.removeItem('user');

		this.router.navigate(['/autenticacao']);
	}


	///////////////////////////////////////////////     UTILS     //////////////////////////////////////////////////////////////////////

	private generateClientId(): string {
		return "android"
	}
	private generateClientSecret(): string {
		return "k5TnN7siiukucQ83RXmq1XLK3BYSs6CWC0DbNQ7rF2KnCxHlUclYn1kkGh0xyLEjDMfBPW7SUoBAuhjjHVaNgOv0m3B6ghZVVuqIq5DOIfy3iYuxXCXcrIvMylQ9pVn0rASrvpUBH3qBFRag3In6aY";
	}

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
