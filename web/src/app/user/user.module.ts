import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UserComponent } from './user.component';
import { userRouting } from './user.routing';
import { UserService } from './shared/user.service';
import { DataTableModule } from './../shared/primeng/datatable';
import { SharedModule } from './../shared/primeng/shared';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    SharedModule,
    userRouting
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    UserFormComponent
  ],
  providers: [UserService]
})
export class UserModule { }