import { Injectable } from '@angular/core';
import { ConfigService } from  '../../app/config.service';
import { Http, Response, Headers } from "@angular/http";
import {HttpClientModule} from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class ReferfriendService {
  UserDetails: any=[];

  constructor(private http: Http,public configService: ConfigService) {
    this.UserDetails   = JSON.parse(localStorage.getItem('userdetails'));
   }
  referFriend(Obj:any,Id) {
    //const body = JSON.stringify(user);
    const headers = new Headers();
    let authtoken = localStorage.getItem('webtoken');
    headers.append('Authorization', authtoken);
   // headers.append('Content-Type', 'multipart/form-data');
     headers.append('Content-Type', 'application/json');
    return this.http.post(this.configService.API_ENDPOINT + 'referFriends/create/'+Id, Obj, {
        headers: headers
    })
        // .map((data: Response) => data.json() || {})
        .map((data: Response) => data.json() || {})
        //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }
   friendsList(Id:number){
    const headers = new Headers();
     let authtoken = localStorage.getItem('webtoken');
     headers.append('Authorization', authtoken);
     return this.http.get(this.configService.API_ENDPOINT+'referFriends/byuser/'+Id, {
         headers: headers
     })
         .map((data: Response) => data.json() || {})     
  }
}
