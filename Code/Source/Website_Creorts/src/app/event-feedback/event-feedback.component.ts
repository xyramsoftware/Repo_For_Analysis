import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import {RegistrationService} from '../../app/registration/registration.service';
import {Router} from '@angular/router';
import { from } from 'rxjs';
@Component({
  selector: 'app-event-feedback',
  templateUrl: './event-feedback.component.html',
  styleUrls: ['./event-feedback.component.css']
})
export class EventFeedbackComponent implements OnInit {

  public feedbackform: FormGroup;
  userdetails: any=[];
  obj: any=[];
  eventdetails: any=[];
  Id:number;
  userInfo: any=[];
  eventdetail: any;
  feedbackdata: any=[];
  displahfeedback: boolean=true;
  constructor(private fb: FormBuilder,private restService:RegistrationService,public router:Router) {
    this.userdetails = JSON.parse(localStorage.getItem('userdetails'));
    this.feedbackform = this.fb.group({
      rateOrganization: ['', [Validators.required]],
      rateEvent: ['',[Validators.required]],
      positiveComments: ['', [Validators.required]],
      negativeComments: ['', Validators.required],
      objective: ['', Validators.required],
      experience: ['', Validators.required],
      partofNextSportival: ['', Validators.required]

    });
     this.eventdetail= JSON.parse(localStorage.getItem('eventdetail'));
    console.log(this.eventdetail);
  }

  ngOnInit() {
    this.gettigfeedback()
  }

  gettigfeedback(){
    this.restService. GetAllFeedbackByEvent(this.userdetails._id,this.eventdetail[0]).subscribe(data=>{
      //console.log(data)
      if(data.length  !==0){
        this.feedbackdata = data[0]
        console.log(this.feedbackdata)
        console.log(this.feedbackdata.positiveComments)
        console.log(this.feedbackdata.negativeComments)
        this.displahfeedback =  false
      }
    })
  }

  isLogin() {
  
    if(localStorage.getItem('webtoken') != null || localStorage.getItem('oauth-token')){
      this.userdetails = JSON.parse(localStorage.getItem('userdetails'));
      // console.log(this.userDetails)
      return true;
    }
    return false;
}

  feedback(){
    console.log(this.feedbackform.value);
    let obj = {
      rateOrganization:this.feedbackform.value.rateOrganization,
      rateEvent:this.feedbackform.value.rateEvent,
      positiveComments:this.feedbackform.value.positiveComments,
      negativeComments:this.feedbackform.value.negativeComments,
      EventID:this.eventdetail[0],
      EventName:this.eventdetail[1],
      userInfo:[{
        name:this.userdetails.name,
        phone:this.userdetails.phone
        
        }],
      userID:this.userdetails._id
  }
    console.log(this.obj);
    if(obj.rateOrganization !== undefined && obj.rateEvent !== undefined){
    this.restService.eventFeedback(this.userdetails._id,obj,this.eventdetail[0]).subscribe(data => {
      //this.loader1.dismiss()
      console.log(data)
      this.router.navigate(['feedback-thankyou']);
    })

    }
  }

}
