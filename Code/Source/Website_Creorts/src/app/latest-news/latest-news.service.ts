import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class LatestNewsService {

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
}
