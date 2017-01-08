import { AuthenticationService } from './../auth/shared/authentication.service';
import { Component, OnInit } from '@angular/core';

import { User } from './../user/shared/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styles: []
})
export class AppNavbarComponent implements OnInit {

  loggedUser: User;
  constructor(private authenticationService: AuthenticationService) {
    this.loggedUser = this.authenticationService.authenticatedUser;
  }

  ngOnInit() {

  }

}
