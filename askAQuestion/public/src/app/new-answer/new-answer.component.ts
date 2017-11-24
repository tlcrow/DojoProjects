import { Component, OnInit, Input } from '@angular/core';
import { AuthPlusService } from '../auth-plus.service';
import { QuestionsService } from '../questions.service';
import { AnswersService } from '../answers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../question';
import { Answer } from '../answer';

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.css']
})
export class NewAnswerComponent implements OnInit {
  answer;
  errors = [];
  _id;
  question;

  constructor(private _authService:AuthPlusService, private _questionService:QuestionsService, private _answerService:AnswersService, private router:Router, private _ar:ActivatedRoute) {
    this.answer = new Answer()
    this._ar.paramMap.subscribe(params => {
      this._id = params.get('id');
      console.log(this._id)
    })
   }

  ngOnInit() {

    this._questionService.getOne(this._id)
    .then((data) => {
      console.log(data)
      this.question = data
    console.log(this.question)})
    .catch((err) =>{
      console.log('service', err)
      })
  }

  onSubmit(){
    this._answerService.create(this.answer, this._id)
    .then(data => {
      // this.answer = new Answer();
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
