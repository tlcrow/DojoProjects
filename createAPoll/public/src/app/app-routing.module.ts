import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPollComponent } from './new-poll/new-poll.component';
import { PollDetailsComponent } from './poll-details/poll-details.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: AuthComponent},
  {path:'registration', redirectTo:'dashboard'},
  {path:'dashboard', pathMatch: 'full', component:DashboardComponent},
  {path:'poll/new', pathMatch: 'full', component: NewPollComponent},
  {path:'poll/:id', pathMatch: 'full', component:PollDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
