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
			client_id: this.getClientId(),
			client_secret: this.getClientSecret(),
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

	private getClientId(): string {
		return "57AE926889924FD233B50F7768069215E3DE3DE34F5DC69E10701097B9B1E99214ABDE87CA45C183965F71C59FB09D9CB9A8BE1DC0C1A2FA4AB767F2BD38540C"
	}
	private getClientSecret(): string {
		return "913D7CF00C793989DDD2C748402B876D9A0ED509A7C307B306FA67B916595F5C439190E68FE4E857CD7B29DB1EFD6C7B22F16378329434BEB5AF41DD02218214875C4B9DE1998F83D3F63E0259ABC39B40B398E87F0F27115D11D793C98A735B143E537D92BD7D83B25E14E58984E568F4636A4A1C12C87903E6A341D69D0812";
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
