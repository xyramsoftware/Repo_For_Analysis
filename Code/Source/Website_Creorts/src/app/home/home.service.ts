import { Injectable } from '@angular/core';
import { ConfigService } from  '../../app/config.service';
import { Http, Response, Headers } from "@angular/http";
import {HttpClientModule} from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: Http,public configService: ConfigService) { }
  getlatestnews(){
    
   const headers = new Headers();
   let authtoken = localStorage.getItem('webtoken');
   headers.append('Authorization', authtoken);
   return this.http.get(this.configService.API_ENDPOINT+'news/all', {
       headers: headers
   })
       .map((data: Response) => data.json() || {})   
  }
  getcarousels(){
    return this.http.get(this.configService.API_ENDPOINT+'carousel/all')
        .map((data: Response) => data.json() || {})   
   }

}
