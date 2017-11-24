import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Question } from './question';
import { Answer } from './answer';

@Injectable()
export class AnswersService {
  private http:Http
  
    constructor(http:Http) {
      this.http = http;
     }
  
    getAll(cb){
      return this.http.get(`/api/answers`)
      .subscribe(
        answers => {
          cb(answers.json())
        },
        err => {console.log("iN sERVICE back from Server"), err}
      )
    }
  
    create(answer, questionId){
      console.log(answer, questionId);
      return this.http.post(`/api/answer/new/${questionId}`, answer)
      .map((response: Response) => response.json())
      .toPromise();
    }
  
    getOne(answerId){
      console.log("log 2", answerId)
      return this.http.get(`/api/likes/${answerId}`)
      .map((response: Response) => response.json())
      .toPromise();
    }

}
