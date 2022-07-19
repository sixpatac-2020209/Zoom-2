import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MeetingComponent } from './components/meeting/meeting.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'zoom', loadChildren: () => import('./components/zoom/zoom.module').then(m => m.ZoomModule) },
  { path: ':meeting', component: MeetingComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
