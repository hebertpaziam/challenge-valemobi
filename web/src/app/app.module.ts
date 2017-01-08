import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ROUTING } from './app.routing';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';

import { AuthenticationService } from './auth/shared/authentication.service';
import { AuthGuardService } from './auth/shared/auth-guard.service';
import { NotFoundComponent } from './errors/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    NotFoundComponent
  ],
  imports: [
    ROUTING,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
