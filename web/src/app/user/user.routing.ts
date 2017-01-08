import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';

import { UserComponent } from './user.component';

const ROUTES: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: UserListComponent
        },
        {
            path: 'usuario/:id',
            component: UserFormComponent
        }
    ]
}];

export const userRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);