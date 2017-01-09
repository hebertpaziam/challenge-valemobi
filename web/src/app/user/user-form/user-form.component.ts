import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from './../shared/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  private hasId: boolean;
  private _user: User = new User();
  private _initialUser: User = new User();

  @Input()
  set user(value: User) {
    this._user = Object.assign({}, value);
    this._initialUser = Object.assign({}, value);
  }

  get user(): User {
    return this._user;
  }

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) this.hasId = true;
    }).unsubscribe();
  }

  goBack() {
    history.back();
  }

  resetForm() {
    this.user = this._initialUser;
  }

  redirectToList() {
    this.router.navigate(['usuarios']);
  }
}
