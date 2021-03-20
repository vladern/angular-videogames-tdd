import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const material = [MatIconModule, MatButtonModule];
@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    ...material
  ],
  exports:[...fromComponents.components]
})
export class SharedModule { }
