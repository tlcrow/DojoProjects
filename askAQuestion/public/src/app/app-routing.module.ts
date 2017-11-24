import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewAnswerComponent } from './new-answer/new-answer.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { QaLoginComponent } from './qa-login/qa-login.component';
import { QuestionDetailsComponent } from './question-details/question-details.component'

const routes: Routes = [
  {path: '', pathMatch: 'full', component: AuthComponent},
  {path:'dashboard', pathMatch: 'full', component: DashboardComponent},
  {path:'dashboard/new_question', pathMatch: 'full', component: NewQuestionComponent},
  {path: 'question/:id', pathMatch: 'full', component: QuestionDetailsComponent},
  {path: 'question/new_answer/:id', pathMatch: 'full', component: NewAnswerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
