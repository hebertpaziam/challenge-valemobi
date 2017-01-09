import { AuthenticationService } from './../auth/shared/authentication.service';
import { User } from './../user/shared/user.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      let loggedUser = JSON.parse(localStorage.getItem('user')) as User;
      this.authenticationService.doLogin(loggedUser);
    }
    else this.authenticationService.doLogout();
  }
}
