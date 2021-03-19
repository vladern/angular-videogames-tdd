import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideogamesListComponent } from './components';

const routes: Routes = [{
  path: '',
  component: VideogamesListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideogamesRoutingModule { }
