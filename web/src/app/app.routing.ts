import { NotFoundComponent } from './errors/not-found/not-found.component';
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
        canActivateChild: [AuthGuardService],
        children: [
            {
                path: 'skates',
                loadChildren: 'app/skate/skate.module#SkateModule',
                canLoad: [AuthGuardService],
            },
            {
                path: 'usuarios',
                loadChildren: 'app/user/user.module#UserModule',
                canLoad: [AuthGuardService],
            }
        ]
    },
    {
        path: 'autenticacao',
        loadChildren: 'app/auth/auth.module#AuthModule'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);