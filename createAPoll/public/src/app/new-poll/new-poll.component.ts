import { Component, OnInit, Input } from '@angular/core';
import { AuthPlusService } from '../auth-plus.service';
import { PollService } from '../poll.service';
import { Router } from '@angular/router';
import { Poll } from '../poll';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css']
})
export class NewPollComponent implements OnInit {
  poll;
  private Errs = [];

  constructor(private _authService:AuthPlusService, private _pollService:PollService, private router:Router) {
    this.poll = new Poll();
   }

  ngOnInit() {
  }

  onSubmit(){
    console.log("ON SUBMIT HAPPEND", this.poll)
    this._pollService.create(this.poll)
    .then(data => {
      this.router.navigateByUrl('/dashboard')
    })
    .catch(err => {
      console.log('this is component', err)
      const errors = JSON.parse(err._body);
      for(let key in errors){
        // console.log(key)
        this.Errs.push(errors[key].message)
      }
    })
  }
}
