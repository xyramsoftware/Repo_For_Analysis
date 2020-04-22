import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class PushNotificationService {

  url: any = 'https://onesignal.com/api/v1/notifications';


  constructor(private http: Http,public constantService: ConstantService) {
  }

  getEventsList()
  {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http
      .get(this.constantService.API_ENDPOINT + 'dates/all', {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  getEventsById(eventid:any){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http
      .get(this.constantService.API_ENDPOINT + 'events/bydates/'+eventid, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }
  

  private handleError(error: any) {
    return Observable.throw(error.json());
  }
}
