import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Auth } from './auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthPlusService {
  private http:Http;
  private auth;
  private auth$;
  // private currentUser;

  constructor(http:Http) {
    this.http = http;
    this.auth = [];
    // this.auth$ = new BehaviorSubject<Auth[]>([]);
   }

   public create(auth){
     console.log(auth);
     return this.http.post('/api/registration', auth)
     .map((response: Response) => response.json())
     .toPromise();
   }

  //  public getAll(){
  //    this.http.get('/api/registration')
  //    .map(data=><Auth[]>data.json())
  //    .subscribe((data)=>{
  //       this.auth = data;
  //       this.auth$.next(this.auth);
  //    })
  //  }

  //  public login(auth){
  //    console.log("service");
  //    return this.http.post('/api/login', auth)
  //    .map((response:Response) => {
  //     //  this.currentUser = response.json()
  //      response.json()
  //     })
  //    .toPromise()
  //  }
   logout(){
    //  this.currentUser = undefined
    // alert("@ Service")
    return this.http.get('/api/logout')
    // .map()
   }
   getUser(){
     return this.http.get('/api/user').map((response:Response) => response.json()).toPromise();
    // cb(this.currentUser);
   }
}

