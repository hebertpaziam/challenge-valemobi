import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthComponent } from './auth.component';
import { authRouting } from './auth.routing';
import { AuthService } from './shared/auth.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    authRouting
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  providers: [AuthService]
})
export class AuthModule { }