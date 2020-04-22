import {Injectable} from '@angular/core';
//import {Http, Response, Headers} from '@angular/http';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';

import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';

@Injectable()

export class TableBookingService {

  constructor(private https: HttpClient) {
  }

  
  private handleError(error: any) {
    return Observable.throw(error.json());
  }

  pushFileToStorage(file: File,message:string): Observable<HttpEvent<{}>> {
    const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('admintoken');
  headers.append('Authorization', authToken);
    const data: FormData = new FormData();
    data.append('file', file,file.name);
    data.append("request",message)
    const newRequest = new HttpRequest('POST', ' https://creorts.com:445/api/admin/upload', data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.https.request(newRequest);
  }

}
