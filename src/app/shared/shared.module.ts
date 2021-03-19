import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';

const components =  [TableComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule
  ],
  exports:[...components]
})
export class SharedModule { }
