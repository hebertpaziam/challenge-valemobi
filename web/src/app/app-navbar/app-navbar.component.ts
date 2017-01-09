import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../auth/shared/authentication.service';
import { Component, OnInit } from '@angular/core';

import { User } from './../user/shared/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html'
})
export class AppNavbarComponent implements OnInit {

  private loggedUser: User;

  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.loggedUser = this.authenticationService.authenticatedUser;
  }

  logout() {
    this.authenticationService.doLogout();
  }

}
