import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SkateModule } from './skate/skate.module';

import { AuthenticationService } from './auth/shared/authentication.service';
import { AuthGuardService } from './auth/shared/auth-guard.service';
import { AuthModule } from './auth/auth.module';


const ROUTES: Routes = [
    {
        path: '',
        loadChildren: 'app/auth/auth.module#AuthModule'
    },
    {
        path: 'home',
        canActivateChild: [AuthGuardService],
        component: AppComponent,
        children: [
            {
                path: 'skate',
                loadChildren: 'app/skate/skate.module#SkateModule',
                canLoad: [AuthGuardService],
            },
            {
                path: 'usuario',
                loadChildren: 'app/user/user.module#UserModule',
                canLoad: [AuthGuardService],
            }
        ]
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);