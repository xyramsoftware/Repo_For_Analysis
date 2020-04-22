import { Injectable } from '@angular/core';
import { ConfigService } from  './config.service';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(private http: Http,public configService: ConfigService) { }

  getAllLinks(){
    const headers = new Headers();
    let authtoken = localStorage.getItem('token');
    headers.append('Authorization', authtoken);
    return this.http.get(this.configService.API_ENDPOINT+'socialMedia/all',{
        headers: headers
    })
        .map((data: Response) => data.json() || {})   
   }
  
  getsociallinks(obj:any,Id:number){
    
    const headers = new Headers();
    let authtoken = localStorage.getItem('token');
    headers.append('Authorization', authtoken);
    return this.http.put(this.configService.API_ENDPOINT+'socialMedia/update/media/'+Id, obj,{
        headers: headers
    })
        .map((data: Response) => data.json() || {})   
   }
}
