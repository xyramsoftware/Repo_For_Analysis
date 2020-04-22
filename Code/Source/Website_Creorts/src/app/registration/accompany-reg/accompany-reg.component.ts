import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { AccompanyService } from './accompany.service';

@Component({
  selector: 'app-accompany-reg',
  templateUrl: './accompany-reg.component.html',
  styleUrls: ['./accompany-reg.component.css']
})
export class AccompanyReg implements OnInit {

  public AccompanyingPersonForm: FormGroup;
  Obj: any = {};
  UserDetails: any = {};
  AccompanyDetails: any = {};
  loading: boolean;
  today = new Date();
  minAge = 5;
  ageLimit = new Date(this.today.getFullYear() - this.minAge, this.today.getMonth(), this.today.getDate()).toISOString().split('T')[0];
  AccompanyEventList: any;
  eventObj: any = [];
  
  constructor(private http: Http, private fb: FormBuilder, public router: Router, public restService: AccompanyService) {
    this.AccompanyingPersonForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]],
      gender: ['', Validators.required],
      DOB: ['', Validators.required],
      place: ['', Validators.required],
      occupation: ['', Validators.required],
      relationship: ['', Validators.required],
      schoolName: [''],
      organisation: [''],
    });
    this.UserDetails = JSON.parse(localStorage.getItem('userdetails'));
  }


  ngOnInit(): void {
    this.getAllEvents();
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  getAllEvents(){
    this.restService.getAllEvents().subscribe(data=>{
      console.log("events")
      console.log(data)
      for(let i=0;i<data.length;i++){
        let Obj={
          EventId:data[i]._id,
          EventName:data[i].title,
          QRScanCheck:false
        }  
         this.eventObj.push(Obj)  
      }
     console.log('event details: ',this.eventObj)
    })
  }

  onRegister() {
    if (!this.loading) {

      console.log(this.AccompanyingPersonForm.value)
      if (this.AccompanyingPersonForm.value.occupation == 'Student') {
        this.AccompanyingPersonForm.controls["schoolName"].setValidators(Validators.required);
      }
      else {
        this.AccompanyingPersonForm.controls["schoolName"].setValidators([]);
      }
      this.AccompanyingPersonForm.controls["schoolName"].updateValueAndValidity();
      if (this.AccompanyingPersonForm.valid) {
        this.loading = true;
        this.AccompanyingPersonForm.value.phone = '91' + this.AccompanyingPersonForm.value.phone
        this.Obj = this.AccompanyingPersonForm.value

        if(this.Obj.occupation == 'Student'){
          this.Obj.organisation = null;
        }else{
          this.Obj.schoolName = null;
        }

        if (this.Obj.email == "") {
          this.Obj.emailCheck = false
          delete this.Obj.email
        } else {
          this.Obj.emailCheck = true
        }

// this.getAllEvents();
this.Obj.AccompanyEventList = this.eventObj;

console.log('after adding events ', this.Obj);
// this.loading = false;

        this.restService.createaccompany(this.Obj, this.UserDetails._id).subscribe(data => {
          console.log(data);
          this.loading = false;
          this.router.navigate(['accompanysuccess']);
        })
      }
      else {
        Object.keys(this.AccompanyingPersonForm.controls).forEach(field => { 
          const control = this.AccompanyingPersonForm.get(field);           
          control.markAsTouched({ onlySelf: true });
        });
      }
    }
  }
}
