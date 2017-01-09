import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './../auth/shared/auth-guard.service';

import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';

import { UserComponent } from './user.component';

const ROUTES: Routes = [{
    path: '',
    component:UserComponent,
    canActivateChild: [AuthGuardService],
    children: [
        {
            path: '',
            component: UserListComponent,
            canLoad: [AuthGuardService],
        },
        {
            path: 'novo',
            component: UserFormComponent,
            canLoad: [AuthGuardService],
        },
        {
            path: 'editar/:id',
            component: UserFormComponent,
            canLoad: [AuthGuardService],
        }
    ]
}];

export const userRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);