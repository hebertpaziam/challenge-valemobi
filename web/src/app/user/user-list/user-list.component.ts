import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor() { }

  private users: Array<any> = [];
  private _selectedUser:any;

   @Input()
    set selectedUser(value: any) {
        this._selectedUser = Object.assign({}, value);
    }

    get selectedUser(): any {
        return this._selectedUser;
    }

  ngOnInit() {

    for (let i = 0; i < 50; i++) {
      this.users.push({
        vin:`test${i}`,
        year:`${1990+i}`,
        brand:`test${i}`,
        color:`test${i}`,
      });
    }
  }
  
}