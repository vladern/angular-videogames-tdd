import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'videogames',
  loadChildren: () => import('./videogames/videogames.module').then(m => m.VideogamesModule)
},
{
  path: '',
  redirectTo: 'videogames',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
