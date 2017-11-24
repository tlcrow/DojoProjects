import { Component, OnInit, Input } from '@angular/core';
import { AuthPlusService } from '../auth-plus.service';
import { QuestionsService } from '../questions.service';
import { AnswersService } from '../answers.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser;
  questions = [];
  search = "";
  

  constructor(private _authService:AuthPlusService, private _questionService:QuestionsService, private _answerService:AnswersService, private router:Router) { }

  ngOnInit() {
    this._authService.getUser()
    .then((data)=>{
      this.currentUser = data
    })
    .catch((err)=>{
      this.router.navigateByUrl('/')
      this.goLogout();
      // console.log('could not find user', err)
    })
    this._questionService.getAll()
      .then((data) => {
      this.questions = data})
      .catch((err) =>{
        console.log('service', err)
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

  // goQuestion(){
  //   this.router.navigateByUrl('/#new_question')
  // }

}
