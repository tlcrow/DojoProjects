import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Poll } from './poll';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PollService {

  private http:Http;
  private auth;

  constructor(http:Http) {
    this.http = http;
    this.auth = [];
   }

   public create(poll){
     console.log(poll);
     return this.http.post('/api/poll/new', poll)
     .map((response: Response) => response.json())
     .toPromise();
   }

   getOne(pollId){
    console.log("get one id-one to many -service", pollId)
    return this.http.get(`/api/poll/${pollId}`)
    .map((response: Response) => response.json())
    .toPromise();
    }

  delete(pollId){
    console.log("this is service", pollId)
    return this.http.delete(`/api/poll/${pollId}`)
    // 
    .subscribe(
    result => {},
    err => {console.log("Not Deleted")}
    )}

    //delete bike
  
  updateOne(pollId){
    console.log('in service option one', pollId)
    return this.http.get(`/api/one/${pollId}`)
    .map((response: Response) => response.json())
    .toPromise();
  }

  updateTwo(pollId){
    console.log('in service option two', pollId)
    return this.http.get(`/api/two/${pollId}`)
    .map((response: Response) => response.json())
    .toPromise();
  }

  updateThree(pollId){
    console.log('in service option three', pollId)
    return this.http.get(`/api/three/${pollId}`)
    .map((response: Response) => response.json())
    .toPromise();
  }

  updateFour(pollId){
    console.log('in service option four', pollId)
    return this.http.get(`/api/four/${pollId}`)
    .map((response: Response) => response.json())
    .toPromise();
  }

  //update bike

  getAll(cb){
    return this.http.get(`/api/polls`)
    .subscribe(
      polls => {
        cb(polls.json())
      },
      err => {console.log("iN sERVICE back from Server"), err}
    )
  }

}
