import { Injectable } from '@angular/core';
import { ConfigService } from  '../../app/config.service';
import { Http, Response, Headers } from "@angular/http";
import {HttpClientModule} from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  UserDetails: any={};

  constructor(private http: Http,public configService: ConfigService) {
 
    this.UserDetails   = JSON.parse(localStorage.getItem('userdetails'));
   }
   accompanyList(Id:number){
    const headers = new Headers();
     let authtoken = localStorage.getItem('webtoken');
     headers.append('Authorization', authtoken);
     return this.http.get(this.configService.API_ENDPOINT+'accompanies/byuser/'+Id, {
         headers: headers
     })
         .map((data: Response) => data.json() || {})     
  }

  getLatestUserData(){  
    const headers = new Headers();
    let authtoken = localStorage.getItem('webtoken');
    console.log(authtoken)
    headers.append('Authorization', authtoken);
    return this.http.get(this.configService.Auth + 'local/users/by/me', {
        headers: headers
    })
        .map((data: Response) => data.json() || {})    
  }
  
}
