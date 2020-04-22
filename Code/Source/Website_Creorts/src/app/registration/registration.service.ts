import { Injectable } from '@angular/core';
import { ConfigService } from '../../app/config.service';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: Http, public configService: ConfigService) { }

  eventList(): Observable<any> {
    // return this.http.get(this.constantService.API_ENDPOINT+'dates/all').map((data:Response)=>data);

    const headers = new Headers();
    let authtoken = localStorage.getItem('webtoken');
    headers.append('Authorization', authtoken);
    return this.http.get(this.configService.API_ENDPOINT + 'categories/all', {
      headers: headers
    })
      .map((data: Response) => data.json() || {})

  }

  geteventsByEventType(catId: any, eventtypeId) {
    // return this.http.get(this.constantService.API_ENDPOINT+'dates/all').map((data:Response)=>data);

    const headers = new Headers();
    let authtoken = localStorage.getItem('webtoken');
    headers.append('Authorization', authtoken);
    return this.http.get(this.configService.API_ENDPOINT + 'events/bytype/' + catId + '/' + eventtypeId, {
      headers: headers
    })
      .map((data: Response) => data.json() || {})

  }

  typeList() {
    // return this.http.get(this.constantService.API_ENDPOINT+'dates/all').map((data:Response)=>data);

    const headers = new Headers();
    let authtoken = localStorage.getItem('webtoken');
    headers.append('Authorization', authtoken);
    return this.http.get(this.configService.API_ENDPOINT + 'type/all', {
      headers: headers
    })
      .map((data: Response) => data.json() || {})

  }

  createUser(payload: any) {
    //const body = JSON.stringify(payload);
    const headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    //headers.append('Content-Type', 'application/json');
    return this.http.post(this.configService.API_ENDPOINT + 'users/create/', payload, {
      headers: headers
    })
      // .map((data: Response) => data.json() || {})
      .map((data: Response) => data.json() || {})
    //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateUser(Id: number, Obj: any) {
    const headers = new Headers();
    let authtoken = localStorage.getItem('webtoken');
    console.log(authtoken)
    headers.append('Authorization', authtoken);
    // headers.append('Content-Type', 'multipart/form-data');
    //headers.append('Content-Type', 'application/json');
    return this.http.put(this.configService.API_ENDPOINT + 'users/eventupdate/' + Id + '/', Obj, {
      headers: headers
    })
      // .map((data: Response) => data.json() || {})
      .map((data: Response) => data.json() || {})
  }

  checkExistingNumber(phone: number): Promise<any> {
    const headers = new Headers();
    return this.http.post(this.configService.API_ENDPOINT + 'users/by/' + '91' + phone, {
      headers: headers
    }).toPromise()
      .then(response => response.json());
  }

  checkExistingEmail(email: string): Promise<any> {
    const headers = new Headers();
    let obj = {
      'email' : email
    }
    return this.http.post(this.configService.Auth + 'local/users/socialmedia/login', obj, {
      headers: headers
    }).toPromise()
      .then(response => response.json());
  }

  checkNumber(phone: number): Promise<any> {
    const headers = new Headers();
    return this.http.post(this.configService.API_ENDPOINT + 'referFriends/byuser/' + '91' + phone, {
      headers: headers
    }).toPromise()
      .then(response => response.json());
  }

  createFeedback(Id: number, obj: any) {
    const headers = new Headers();
    let authtoken = localStorage.getItem('webtoken');
    console.log(authtoken)
    headers.append('Authorization', authtoken);
    // headers.append('Content-Type', 'multipart/form-data');
    //headers.append('Content-Type', 'application/json');
    return this.http.post(this.configService.API_ENDPOINT + 'feedback/create/' + Id, obj, {
      headers: headers
    })
      // .map((data: Response) => data.json() || {})
      .map((data: Response) => data.json() || {})
  }

  GetAllFeedback(Id) {
    /// http://localhost:3000/api/feedback/byuser/:userID
    const headers = new Headers();
    let authtoken = localStorage.getItem('webtoken');
    headers.append('Authorization', authtoken);
    return this.http.get(this.configService.API_ENDPOINT + 'feedback/byuser/' + Id, {
      headers: headers
    })
      .map((data: Response) => data.json() || {})
    //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  eventFeedback(Id: number, obj: any, eventId) {
    const headers = new Headers();
    let authtoken = localStorage.getItem('webtoken');
    console.log(authtoken)
    headers.append('Authorization', authtoken);
    // headers.append('Content-Type', 'multipart/form-data');
    //headers.append('Content-Type', 'application/json');
    return this.http.post(this.configService.API_ENDPOINT + 'eventfeedback/create/' + Id + '/' + eventId, obj, {
      headers: headers
    })
      // .map((data: Response) => data.json() || {})
      .map((data: Response) => data.json() || {})
  }


  GetAllFeedbackByEvent(Id, eventId) {
    /// http://localhost:3000/api/eventfeedback/byuser/:userID/:EventID
    const headers = new Headers();
    let authtoken = localStorage.getItem('webtoken');
    headers.append('Authorization', authtoken);
    return this.http.get(this.configService.API_ENDPOINT + 'eventfeedback/byuser/' + Id + "/" + eventId, {
      headers: headers
    })
      .map((data: Response) => data.json() || {})
    //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAllQREvents(): Observable<any> {
    return this.http.get(this.configService.API_ENDPOINT + 'events/all').map(data => data.json());
  }


}
