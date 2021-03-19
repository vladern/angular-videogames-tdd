import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideogamesRoutingModule } from './videogames-routing.module';

import * as fromComponents from './components/index';

@NgModule({
  declarations: [fromComponents.components],
  imports: [
    CommonModule,
    VideogamesRoutingModule
  ]
})
export class VideogamesModule { }
