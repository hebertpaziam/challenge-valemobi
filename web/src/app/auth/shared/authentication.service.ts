import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from './../../user/shared/user.model';

@Injectable()
export class AuthenticationService {

  public authenticatedUser: User;

  constructor(private router: Router) {
  }

  doLogin(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.authenticatedUser = JSON.parse(localStorage.getItem('user')) as User;

    this.router.navigate(['/home'])
  }
  doLogout() {

  }
}
