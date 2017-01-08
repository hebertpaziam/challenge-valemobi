import { AuthenticationService } from './auth/shared/authentication.service';
import { User } from './user/shared/user.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router:Router) {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/autenticacao']);
    }
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      let loggedUser = JSON.parse(localStorage.getItem('user')) as User;
      this.authenticationService.doLogin(loggedUser);
    }
  }
}
