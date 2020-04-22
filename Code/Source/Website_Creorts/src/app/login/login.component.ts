import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { ConfigService } from '../config.service';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular4-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


 loading:boolean;
   GOOGLE_AUTH_URL = this.confService.GOOGLE_AUTH_URL;
   FACEBOOK_AUTH_URL = this.confService.FACEBOOK_AUTH_URL;

  phone : any;
  public signinForm:FormGroup;
  constructor(private socialAuthService: AuthService, private fb: FormBuilder,private restService:LoginService, private router:Router, private confService: ConfigService) { 
    this.signinForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9_-]{10}')]]
    });
  }

  public socialSignIn(socialPlatform : string) {
    this.loading = true;
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // ...
        localStorage.setItem("oauthUser", JSON.stringify(userData));
        this.getLocalUserData();

      },
      (error) => {
        console.error("error occured ", error);
      }
    );
  }

  getLocalUserData(){
   
    this.restService.checkUserExists().subscribe(data=>{
        
      console.log(data);

      console.log(data);
      localStorage.setItem('webtoken', "bearer " + data.token);
      this.getUserData()
    },
    error =>{
      console.error("User details not found, redirecting to registration ");
      localStorage.removeItem("oauth-token");
      this.router.navigate(['registration']);
    }
    );
  }

  ngOnInit(): void {
  }
  
  userlogin(){
    this.loading = true;
    console.log(this.signinForm.value)
    if(this.signinForm.valid){
      console.log(this.signinForm.valid)

      this.phone = this.signinForm.value.phone;
      this.signinForm.value.phone = '91'+this.signinForm.value.phone;
      console.log(this.signinForm.value)

      this.restService.login(this.signinForm.value).subscribe(data=>{
        //this.loader1.dismiss()
          console.log(data);
          localStorage.setItem('webtoken', "bearer " + data.token);
          this.loading = false;
          this.getUserData()
      },
      error => {
        console.log('Error occured while login -> ',error);
        if(error.status == 400)
         this.signinForm.get('phone').setErrors({'validmobile': true});
        else
        this.signinForm.get('phone').setErrors({'serverError': true});
        this.loading = false;
      });
      this.signinForm.value.phone = this.phone;
    }
  }

  getUserData(){
   
    this.restService.tokenlogin().subscribe(data=>{
      console.log(data);
      localStorage.setItem('userdetails', JSON.stringify(data));
      this.router.navigate(['']);
    });


  }

}
