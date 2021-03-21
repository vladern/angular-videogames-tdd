import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';

const material = [
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatDialogModule,
];
@NgModule({
  declarations: [...fromComponents.components, ...fromComponents.modals],
  imports: [CommonModule, ...material],
  exports: [...fromComponents.components],
  providers: [...fromComponents.modals]
})
export class SharedModule {}
