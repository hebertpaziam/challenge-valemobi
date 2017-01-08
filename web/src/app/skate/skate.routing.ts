import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkateFormComponent } from './skate-form/skate-form.component';
import { SkateListComponent } from './skate-list/skate-list.component';

import { SkateComponent } from './skate.component';

const ROUTES: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: SkateListComponent
        },
        {
            path: 'skate/:id',
            component: SkateFormComponent
        }
    ]
}];

export const skateRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);