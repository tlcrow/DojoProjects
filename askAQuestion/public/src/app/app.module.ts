import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthPlusService } from './auth-plus.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { QaLoginComponent } from './qa-login/qa-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { NewAnswerComponent } from './new-answer/new-answer.component';

import { QuestionsService } from './questions.service';
import { AnswersService } from './answers.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    QaLoginComponent,
    DashboardComponent,
    NewQuestionComponent,
    QuestionDetailsComponent,
    NewAnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule

  ],
  providers: [AuthPlusService, QuestionsService, AnswersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
