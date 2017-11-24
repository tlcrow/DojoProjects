import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthPlusService } from './auth-plus.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { PollService } from './poll.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPollComponent } from './new-poll/new-poll.component';
import { PollDetailsComponent } from './poll-details/poll-details.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    NewPollComponent,
    PollDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule

  ],
  providers: [AuthPlusService, PollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
