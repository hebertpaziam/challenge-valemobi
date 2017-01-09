import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../shared/user.model';
import { UserService } from './../shared/user.service';

declare let moment: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  private users: Array<User> = [];
  private _selectedUser: User = new User();

  @Input()
  set selectedUser(value: User) {
    this._selectedUser = Object.assign({}, value);
  }

  get selectedUser(): User {
    return this._selectedUser;
  }

  ngOnInit() {

    for (let i = 0; i < 50; i++) {
      this.users.push({
        id: i,
        name: `nametest${i}`,
        username: `usertest${i}`,
        password: `passtest${i}`,
        salt: `salttest${i}`,
        created: moment()
      });
    }

  }

  newUser() {
    this.router.navigate([`/usuarios/novo`])
  }

  viewDescript(user: User) {
    this.selectedUser = user;
  }

  editUser(user: User) {
    this.router.navigate([`/usuarios/editar/${user.id}`]);
  }

  removeUser(user: User) {
    this.userService;
  }

}
