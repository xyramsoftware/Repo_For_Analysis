import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class OAuthHandlerService {

  constructor(private http: Http, private configService: ConfigService) { }

  getOAuthUser() {

    const headers = new Headers();
    let oauthtoken = localStorage.getItem('oauth-token');
    console.log(oauthtoken);
    headers.append('authorization', "Bearer " + oauthtoken);
    // headers.append('NoAuth', "true");
    return this.http.get(this.configService.JAVA_BASE_URL+'/user/me', {
      headers: headers
    })
      .map((data: Response) => data.json() || {})
  }

  checkUserExists() {
    let oauthUser = JSON.parse(localStorage.getItem('oauthUser'));
    console.log(oauthUser);
    let payload = {
      email : oauthUser.email
    };
    return this.http.post(this.configService.Auth + 'local/users/socialmedia/login', payload)
  
        .map((data: Response) => data.json() || {})
  }

  tokenlogin(){
  
    const headers = new Headers();
    let authtoken = localStorage.getItem('token');
    console.log(authtoken)
    headers.append('Authorization', authtoken);
    return this.http.get(this.configService.Auth + 'local/users/by/me', {
        headers: headers
    })
  
        .map((data: Response) => data.json() || {})   
    
  }
}