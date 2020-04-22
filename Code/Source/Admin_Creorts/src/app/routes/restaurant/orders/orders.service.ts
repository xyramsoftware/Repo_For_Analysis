import {Injectable} from '@angular/core';
import {Http, Response,RequestOptions, Headers} from '@angular/http';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';

@Injectable()

export class OrdersService {

  constructor(public http: Http, public constantService: ConstantService) {
  }

  //get screens List
  getFeedbackList() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http
      .get(this.constantService.API_ENDPOINT + 'feedback/all/', {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }
  getFeedbackeventList() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http
      .get(this.constantService.API_ENDPOINT + 'eventfeedback/all/', {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }
  getFeedbackByUserId(feedbackId:any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http
      .get(this.constantService.API_ENDPOINT + 'feedback/byuser/'+ feedbackId, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }
  getFeedbackeventByUserId(feedbackusertId:any,feedbackeventId:any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http
      .get(this.constantService.API_ENDPOINT + 'eventfeedback/byuser/'+ feedbackusertId+'/'+feedbackeventId, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }
  getQuestionOne() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http
      .get(this.constantService.API_ENDPOINT + 'feedback/question/one', {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  getQuestionTwo() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http
      .get(this.constantService.API_ENDPOINT + 'feedback/question/two', {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }


  private handleError(error: any) {
    return Observable.throw(error.json());
  }


  
 

}
