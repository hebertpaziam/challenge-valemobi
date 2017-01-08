import { Injectable } from '@angular/core';
import { CanLoad, CanActivateChild } from '@angular/router';

import { User } from './../../user/shared/user.model';

@Injectable()
export class AuthGuardService implements CanLoad, CanActivateChild {

  public userAuthenticated: User = JSON.parse(localStorage.getItem('user'));

  is:boolean = true;

  canLoad(): boolean {
    return this.is
  }

  canActivateChild(): boolean {
    return this.is
  }
}