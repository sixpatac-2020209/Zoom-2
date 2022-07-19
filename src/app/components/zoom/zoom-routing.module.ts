import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZoomComponent } from './zoom.component';

const routes: Routes = [
  { path: ':meeting/:passcode', component: ZoomComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoomRoutingModule { }
