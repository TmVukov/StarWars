import { MoviesComponent } from './movies/movies.component';
import { WookieComponent } from './wookie/wookie.component';
import { DroidComponent } from './droid/droid.component';
import { HumanComponent } from './human/human.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'human', component: HumanComponent },
  { path: 'droid', component: DroidComponent },
  {
    path: 'wookie',
    component: WookieComponent,
    children: [{ path: ':starship/films', component: MoviesComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
