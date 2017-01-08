import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkateComponent } from './skate.component';

const ROUTES: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: SkateComponent
        }
    ]
}];

export const skateRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);