import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthPlusService } from './auth-plus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  currentUser = '';
  constructor(private _service:AuthPlusService,private router:Router) { }
  ngOnChanges(changes:SimpleChanges){
    this.getLoggedUser();
  }
  
  ngOnInit() {
    this.getLoggedUser();
  } 
  getLoggedUser(){
    this._service.getUser()//currentUser => this.currentUser = currentUser);
    .then((data)=>{
      this.currentUser = data
    })
    .catch((err)=>{
      this.currentUser = "";
      // this.router.navigateByUrl('/')      
      console.log('could not find user', err)
    })
  }
}
