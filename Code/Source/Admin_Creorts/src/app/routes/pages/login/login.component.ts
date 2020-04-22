import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../../core/settings/settings.service';
import {FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Router} from '@angular/router';
import {ToastrService} from 'toastr-ng2';
import {LoginService} from './login.service';
import { ConstantService } from '../../../constant.service';

import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  valForm: FormGroup;
  isLoading: boolean = false;
  rememberMe:boolean = false;

  constructor(public settings: SettingsService,
              fb: FormBuilder,
              public router: Router,
              public toastr: ToastrService,
              public loginService: LoginService,
              public constantService: ConstantService,
              private _cookieService:CookieService) //,public toastr: ToastrService
  { 
    //this._cookieService.remove('rememberMe');

    this.check();

    this.valForm = fb.group({
      //'email': ['ionicfirebaseapp@gmail.com', Validators.compose([Validators.required, CustomValidators.email])],
      //'password': ['123456', Validators.required]
      'user': ['', Validators.required],
      'password': ['', Validators.required]
    });

    this.getCookie();
  }

  // putCookie(){
  //   console.log("cookie saved");
  //   this._cookieService.put('name','shubham');
  // }

  getCookie(){
    let rememberMeData:any = {};
    rememberMeData = this._cookieService.getObject('rememberMe');
    console.log(rememberMeData)
    if(rememberMeData != undefined){
      // console.log("Remember me is ok");
      // console.log("Remember me obj "+JSON.stringify(rememberMeData));
      this.valForm.get('email').setValue(rememberMeData.email);
      this.valForm.get('password').setValue(rememberMeData.password);
    }
    else{
      console.log("No data inside cookies");
    }
  }

  check() {
    let isToken: any = localStorage.getItem('admintoken');
    if (isToken) {
      this.loginService.adminData().subscribe((res) => {
        this.router.navigate(['home']);
      }, (error) => {
        localStorage.clear();
      })
    }
  }
  
  checkMe(){
   console.log("remember Me "+this.rememberMe);
  }

  submitForm($ev, value: any) {
   // console.log("sdfsdl")

     
    $ev.preventDefault();
    //console.log("jdfgkfjgksd")
     console.log(this.valForm.valid)
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      this.isLoading = !this.isLoading;
      if(this.rememberMe){
        console.log("remeberMe");
        this._cookieService.putObject('rememberMe',this.valForm.value)
      }
      this.loginService.loginData(this.valForm.value)
        .subscribe(response => {
          console.log(response)
          if(response.message == "This password is not correct."){
            this.toastr.error('This password is not correct. !', 'Alert!');
            this.isLoading = !this.isLoading;

          }
          else if(response.message=="This Username is not registered.")
          {
            this.toastr.error('This user is not authorized. !', 'Alert!');
            this.isLoading = !this.isLoading;
          }
          else {
            this.toastr.success('Logged in Successfully!', 'Success!');
            localStorage.setItem('admintoken', "bearer " + response.token);
            this.loginService.adminData().subscribe((res) => {
  
              console.log(res)
              this.loginService.sendInfoToSocket(res._id);
              localStorage.setItem('admin_id', res._id);
              this.router.navigate(['home']); 
              //this.gethredercolor()
             // this.router.navigate(['home']);
              
            })
          }
          
        },(error)=>{
          this.isLoading = !this.isLoading;
          this.toastr.error("Error",error.message);
        }
      )

    }
    else{
      this.toastr.error('Username and password is required. !', 'Alert!');
      this.isLoading = this.isLoading;
    }
  }

  gethredercolor(){
    let clientId = localStorage.getItem("id")
    this.loginService.gettingcolore().subscribe(data=>{
      console.log(data)
      if(data.length != 0){
        localStorage.setItem('headercolor', JSON.stringify(data));
        let url = this.constantService.API_ENDPOINT+"dashboard/dashicon/"+data[0]._id+'?clientID='+clientId+'&id='+data[0]._id+'&dashicon='+data[0].dashicon
        console.log(url)
        localStorage.setItem('headerIcon', JSON.stringify([url]));
      }
      this.router.navigate(['users/manageUsers']); 
              this.isLoading = !this.isLoading;
    // this.bgimgae = "linear-gradient(to right, "+data.headercolor+" 0%, "+data.headercolor+" 100%)"
    })
  }

  ngOnInit() {

  }

}
