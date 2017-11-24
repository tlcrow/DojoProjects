import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Question } from './question';
import { Answer } from './answer';

@Injectable()
export class QuestionsService {
  private http:Http

  constructor(http:Http) {
    this.http = http;
   }

  getAll(){
    return this.http.get(`/api/questions`)
    .map((response: Response) => response.json())
    .toPromise();
  }

  create(question){
    console.log("this is service", question);
    return this.http.post('/api/question/new', question)
    .map((response: Response) => response.json())
    .toPromise();
  }

  getOne(questionId){
    console.log("get one id", questionId)
    return this.http.get(`/api/question/${questionId}`)
    .map((response: Response) => response.json())
    .toPromise();
    }

}
