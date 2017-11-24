import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth';
import { AuthPlusService } from '../auth-plus.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
// import {Location} from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private authPlusService: AuthPlusService;
  private auth$: Observable<Auth>;
  private userLogin: Auth;
  private userRegister: Auth;
  private regErrs = [];
  private logErrs = '';

  constructor(authPlusService: AuthPlusService, private router:Router){//,private _loc:Location) {
    this.authPlusService = authPlusService;
    this.userLogin = new Auth();
    this.userRegister = new Auth();
    this.auth$ = new Observable<Auth>();
   }

  ngOnInit() {
    // this.auth$ = this.authPlusService.doSubscribe();
  }

  onLogin(){
    this.authPlusService.login(this.userLogin)
    .then ((data)=>{
      window.location.reload();
      this.router.navigateByUrl('/registration')
    })
    .catch((err)=>{
      console.log(err)
      this.logErrs = JSON.parse(err._body);
    })
    
  }

  onRegister(){
    this.authPlusService.create(this.userRegister)
    .then ((data)=>{
      console.log(data)
      this.userRegister = new Auth()
      this.router.navigateByUrl('/registration')
    })
    .catch((err)=>{
      // console.log(err)
      const errors = JSON.parse(err._body)
      console.log(errors)
      for(let key in errors){
        // console.log(key)
        this.regErrs.push(errors[key].message)
      }
    })
    
  }

}
