import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './../shared/authentication.service';
import { User } from './../../user/shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User = new User();
  private loggedUser: User = new User();

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.loggedUser = JSON.parse(localStorage.getItem('user')) as User;
      this.authenticationService.doLogin(this.loggedUser);
    }
  }

  ngOnInit() {
  }

  submitForm() {
    this.authenticationService.doLogin(this.user);
  }

}
