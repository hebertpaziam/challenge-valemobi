import { AuthenticationService } from './auth/shared/authentication.service';
import { User } from './user/shared/user.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      let loggedUser = JSON.parse(localStorage.getItem('user')) as User;
      this.authenticationService.doLogin(loggedUser);
    }
  }
}
