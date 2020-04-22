import { Injectable } from '@angular/core';
import { ConfigService } from  '../../app/config.service';
import { Http, Response, Headers } from "@angular/http";
import {HttpClientModule} from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: Http, public configService: ConfigService) { }
  login(payload:any) {
    //const body = JSON.stringify(payload);
    const headers = new Headers();
  // headers.append('Content-Type', 'multipart/form-data');
  //headers.append('Content-Type', 'application/json');
    return this.http.post(this.configService.Auth + 'local/users/login', payload, {
        headers: headers
    })
        // .map((data: Response) => data.json() || {})
        .map((data: Response) => data.json() || {})
        //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}
tokenlogin(){
  // return this.http.get(this.constantService.API_ENDPOINT+'dates/all').map((data:Response)=>data);

  const headers = new Headers();
  let authtoken = localStorage.getItem('webtoken');
  console.log(authtoken)
  headers.append('Authorization', authtoken);
  return this.http.get(this.configService.Auth + 'local/users/by/me', {
      headers: headers
  })

      .map((data: Response) => data.json() || {})
     // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));      
  
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
}
