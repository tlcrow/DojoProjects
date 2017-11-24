import { Component, OnInit, Input } from '@angular/core';
import { AuthPlusService } from '../auth-plus.service';
import { QuestionsService } from '../questions.service';
import { AnswersService } from '../answers.service';
import { Router } from '@angular/router';
import { Question } from '../question';
import { Answer } from '../answer';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {
  question;
  errors = [];

  constructor(private _authService:AuthPlusService, private _questionService:QuestionsService, private _answerService:AnswersService, private router:Router) {
    this.question = new Question();
   }

  ngOnInit() {
  }

  onSubmit(){
    console.log("ON SUBMIT HAPPEND", this.question)
    this._questionService.create(this.question)
    .then(data => {
      this.question = new Question();
      this.router.navigateByUrl('/dashboard')
    })
    .catch(err => {
      console.log('this is component', err)
      this.errors = JSON.parse(err._body);
    })
  }

  goLogout(){
    this._authService.logout().subscribe(
      // (data)=>{console.log(data)},
      // (err)=>{console.log(err)}
    );
    window.location.reload();    
    this.router.navigateByUrl('/')
  }

}
