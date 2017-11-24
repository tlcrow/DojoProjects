import { Component, OnInit, OnChanges,SimpleChanges } from '@angular/core';
import { PollService } from './../poll.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.css']
})
export class PollDetailsComponent implements OnInit, OnChanges {
  _id;
  poll;

  constructor(private _pollService:PollService, private router:Router, private _ar:ActivatedRoute) {
    this._ar.paramMap.subscribe(params => {
      this._id = params.get('id');
      console.log(this._id)
    })
    console.log("component", this._id)
    this.get();
  }

  ngOnInit() {
    // this._ar.paramMap.subscribe(params => {
    //   this._id = params.get('id');
    //   console.log(this._id)
    // })
    // console.log("component", this._id)
    // this.get();
    
  }
  ngOnChanges(changes:SimpleChanges){
    alert("changes made")
    this.poll = changes.poll.currentValue;
    alert("changes made")
  }


  get(){
  this._pollService.getOne(this._id)
  .then ((data) => {
    // console.log ("in the component", data)
    this.poll = data
    console.log("this is data", this.poll)})
    .catch((err) =>{
      console.log('service', err)
  })
}

  optionOne(id){
    this._pollService.updateOne(id)
      .then((data) => {
        this.poll = data;
    })
       .catch((err) =>{
        console.log('service err option one')
      })
}

optionTwo(id){
  this._pollService.updateTwo(id)
    .then((data) => {
      this.poll = data;
  })
     .catch((err) =>{
      console.log('service err option two')
    })
}

optionThree(id){
  this._pollService.updateThree(id)
    .then((data) => {
      this.poll = data;
  })
     .catch((err) =>{
      console.log('service err option three')
    })
}

optionFour(id){
  this._pollService.updateFour(id)
    .then((data) => {
      this.poll = data;
  })
     .catch((err) =>{
      console.log('service err option four')
    })
}


  // findOne(){
  //   console.log("component", this._id)
  //   this._pollService.getOne(this._id)
  //   .then ((data) => {
  //     console.log ("in the component", data)
  //     this.poll = data
  //   })
  //     .catch((err) =>{
  //       console.log('service', err)
  //   })
  // }

}
