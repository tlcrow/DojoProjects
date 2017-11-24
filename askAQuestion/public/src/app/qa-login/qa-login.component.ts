import { Component, OnInit, Input } from '@angular/core';
import { AuthPlusService } from '../auth-plus.service';
import { QuestionsService } from '../questions.service';
import { AnswersService } from '../answers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qa-login',
  templateUrl: './qa-login.component.html',
  styleUrls: ['./qa-login.component.css']
})
export class QaLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
