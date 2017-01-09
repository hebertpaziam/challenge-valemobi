import { Injectable } from '@angular/core';
import {
  CanActivate, CanLoad, Router, Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  ActivatedRoute
} from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { User } from './../../user/shared/user.model';

@Injectable()
export class AuthGuardService implements CanLoad, CanActivateChild {

  public userAuthenticated: User;

  private authRoute: string = "/autenticacao";
  private isAuth: boolean;

  constructor(private authenticator: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute) {

    if (localStorage.getItem('user')) this.userAuthenticated = JSON.parse(localStorage.getItem('user')) as User;
    this.isAuth = !!this.authenticator.authenticatedUser;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.tryAccessUrl(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    return this.tryAccessUrl(url);
  }

  tryAccessUrl(url) {
    if (!this.authenticator.authenticatedUser && url !== this.authRoute) {
      this.router.navigate([this.authRoute]);
      return false;
    }
    else if (this.authenticator.authenticatedUser && url === this.authRoute) {
      this.router.navigate(['skates']);
      return false;
    }
    else return true;
  }
}