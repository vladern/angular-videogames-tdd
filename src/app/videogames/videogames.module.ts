import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideogamesRoutingModule } from './videogames-routing.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import * as fromComponents from './components/index';

@NgModule({
  declarations: [fromComponents.components],
  imports: [
    CommonModule,
    VideogamesRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class VideogamesModule { }
