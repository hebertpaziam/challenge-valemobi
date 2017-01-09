import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './../auth/shared/auth-guard.service';

import { SkateFormComponent } from './skate-form/skate-form.component';
import { SkateListComponent } from './skate-list/skate-list.component';

import { SkateComponent } from './skate.component';

const ROUTES: Routes = [{
    path: '',
    component:SkateComponent,
    canActivateChild: [AuthGuardService],
    children: [
        {
            path: '',
            component: SkateListComponent,
            canLoad: [AuthGuardService],
        },
        {
            path: '/novo',
            component: SkateFormComponent,
            canLoad: [AuthGuardService],
        },
        {
            path: '/editar/:id',
            component: SkateFormComponent,
            canLoad: [AuthGuardService],
        }
    ]
}];

export const skateRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);