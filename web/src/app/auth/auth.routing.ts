
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

const ROUTES: Routes = [
    {
        path: '',
        component: LoginComponent
    }
];

export const authRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);