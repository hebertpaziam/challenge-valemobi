
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

const ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'login'
            },
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    }];

export const authRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);