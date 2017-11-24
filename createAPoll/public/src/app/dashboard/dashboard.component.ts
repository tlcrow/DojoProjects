import { Component, OnInit, Input } from '@angular/core';
import { AuthPlusService } from '../auth-plus.service';
import { PollService } from '../poll.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser;
  polls = [];
  search = "";

  constructor(private _authService:AuthPlusService, private _pollService:PollService, private router:Router) { }

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
    this._pollService.getAll((data)=>this.polls = data)
      
  }

  delete(pollId){
    this._pollService.delete(pollId);
    this.router.navigateByUrl('/dashboard');
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
