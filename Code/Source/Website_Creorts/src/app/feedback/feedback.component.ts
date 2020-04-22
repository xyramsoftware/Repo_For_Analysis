import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import {RegistrationService} from '../../app/registration/registration.service';
import {Router} from '@angular/router';
import { from } from 'rxjs';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],

})
export class FeedbackComponent implements OnInit{

  public feedbackform: FormGroup;
  userdetails: any=[];
  obj: any=[];
  feedbackdata: any=[{}];
  displahfeedback: boolean=true;
  constructor(private fb: FormBuilder,private restService:RegistrationService,public router:Router) {
    this.userdetails = JSON.parse(localStorage.getItem('userdetails'));
    this.feedbackform = this.fb.group({
      rateOrganization: ['', [Validators.required]],
      rateEvent: ['',[Validators.required]],
      positiveComments: [''],
      negativeComments: [''],
      objective: [''],
      experience: [''],
      partofNextSportival: ['']

    });
  }

  ngOnInit() {
    this.gettigfeedback();
  }
  gettigfeedback(){
    this.restService.GetAllFeedback(this.userdetails._id).subscribe(data=>{
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

  feedback(){
    console.log(this.feedbackform.value);
    let obj = {
      userInfo:[{
        name:this.userdetails.name,
        phone:this.userdetails.phone
        
        }],
      rateOrganization:this.feedbackform.value.rateOrganization,
      rateEvent:this.feedbackform.value.rateEvent,
      positiveComments:this.feedbackform.value.positiveComments,
      negativeComments:this.feedbackform.value.negativeComments,
      objective:this.feedbackform.value.objective,
      experience:this.feedbackform.value.experience,
      partofNextSportival:this.feedbackform.value.partofNextSportival,
      userID:this.userdetails._id
  }
    console.log(this.obj);
    if(obj.rateOrganization != undefined && obj.rateEvent != undefined){

    this.restService.createFeedback(this.userdetails._id,obj).subscribe(data => {
      //this.loader1.dismiss()
      console.log(data)
      this.gettigfeedback()
      this.displahfeedback =  false
      this.router.navigate(['feedback-thankyou']);

    })
  }
  }
}
