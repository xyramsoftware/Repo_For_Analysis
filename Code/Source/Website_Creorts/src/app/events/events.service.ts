import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import {HttpClientModule} from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";
import { ConfigService } from  '../../app/config.service';
@Injectable()
export class EventsService {

  constructor(private http: Http,public configService: ConfigService) { }
  datesList(){
    // return this.http.get(this.constantService.API_ENDPOINT+'dates/all').map((data:Response)=>data);

     const headers = new Headers();
     let authtoken = localStorage.getItem('webtoken');
     headers.append('Authorization', authtoken);
     return this.http.get(this.configService.API_ENDPOINT+'dates/all', {
         headers: headers
     })
         .map((data: Response) => data.json() || {})       
    
 }

 GettingEventId(Id){
    const headers = new Headers();
    let authtoken = localStorage.getItem('webtoken');
    headers.append('Authorization', authtoken);
    return this.http.get(this.configService.API_ENDPOINT + 'api/events/bydates/'+ Id, {
        headers: headers
    })
        .map((data: Response) => data.json() || {})
      //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}
 displayevent(id) {
    const headers = new Headers();
    let authtoken = localStorage.getItem('webtoken');
    headers.append('Authorization', authtoken);
    return this.http.get(this.configService.API_ENDPOINT + 'events/bydates/' +id, {
        headers: headers
    })
        .map((data: Response) => data.json() || {})
      //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}

}
