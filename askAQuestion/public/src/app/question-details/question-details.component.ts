import { Component, OnInit, Input } from '@angular/core';
import { AuthPlusService } from '../auth-plus.service';
import { QuestionsService } from '../questions.service';
import { AnswersService } from '../answers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../question';
import { Answer } from '../answer';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  answers = []
  _id;
  question;
  

  constructor(private _authService:AuthPlusService, private _questionService:QuestionsService, private _answerService:AnswersService, private router:Router, private _ar:ActivatedRoute) { 
    this._ar.paramMap.subscribe(params => {
      this._id = params.get('id');
      console.log(this._id)
    })
  }

  ngOnInit() {
    // this._answerService.getAll((data) => this.answers = data)
    this.getQuestion()
    // this.sortLikes()
  }

  onLike(id){
    this._answerService.getOne(id)
      .then((data) => {
        console.log(data)
        this.getQuestion()
        // this.sortLikes()
    })
       .catch((err) =>{
        console.log('service err')
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

  getQuestion(){
    this._questionService.getOne(this._id)
    .then((data) => {
      console.log(data)
      this.question = data
      this.sortLikes()
    console.log(this.question)})
    .catch((err) =>{
      console.log('service', err)
      })
  }

  sortLikes(){
    this.question._answer.sort((a, b) =>{
      return b.likes - a.likes;
    })
  }

}
