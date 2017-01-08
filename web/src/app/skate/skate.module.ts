import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SkateComponent } from './skate.component';
import { skateRouting } from './skate.routing';
import { SkateService } from './shared/skate.service';
import { DataTableModule } from './../shared/primeng/datatable';
import { SharedModule } from './../shared/primeng/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    SharedModule,
    skateRouting
  ],
  declarations: [
    SkateComponent
  ],
  providers: [SkateService]
})
export class SkateModule { }