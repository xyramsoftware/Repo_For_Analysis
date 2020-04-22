import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { OAuthHandlerService } from './o-auth-handler.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-o-auth-handler',
  templateUrl: './o-auth-handler.component.html',
  styleUrls: ['./o-auth-handler.component.css']
})
export class OAuthHandlerComponent implements OnInit {
  token: string;

  constructor(private route: ActivatedRoute, private restService: OAuthHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .filter(params => params.token)
      .subscribe(params => {
      console.log(params);

      localStorage.setItem('oauth-token', params.token);
      this.getOAuthUserData();
    },
    error => {
      console.error('Authentication failed ', error);
      this.router.navigate['login'];
    })
  }

  getOAuthUserData(){
    this.restService.getOAuthUser().subscribe(data=>{
      console.log(data);
      localStorage.setItem('oauthUser', JSON.stringify(data));
      this.getLocalUserData();
    },
    error => {
      console.log(error);
    });
  }

  getLocalUserData(){
   
    this.restService.checkUserExists().subscribe(data=>{
        
      console.log(data);

      console.log(data);
      localStorage.setItem('token', "bearer " + data.token);
      this.getUserData()

      // localStorage.setItem('userdetails', JSON.stringify(data[0]));
      // if(data)
      // this.router.navigate(['']);
    },
    error =>{
      console.error("User details not found, redirecting to registration ");
      localStorage.removeItem("oauth-token");
      this.router.navigate(['registration']);
    }
    );
  }

  getUserData(){
   
    this.restService.tokenlogin().subscribe(data=>{
      console.log(data);
      localStorage.setItem('userdetails', JSON.stringify(data));
      this.router.navigate(['']);
    });


  }
}
