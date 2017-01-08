import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

const ROUTES: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: UserComponent
        }
    ]
}];

export const userRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);