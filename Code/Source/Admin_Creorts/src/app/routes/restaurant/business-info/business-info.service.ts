import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';

@Injectable()

export class BusinessInfoService {

  constructor(public http: Http, public constantService: ConstantService) {
  }

  //Get All Business Data
  getBusinessInfoData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'businesses', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }


  //Add New Business Data
  addBusinessData(data: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.post(this.constantService.API_ENDPOINT + 'businesses', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  //Update Businesses By Id
  updateBusinessData(data: any, businessId: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'businesses/' + businessId, body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  private handleError(error: any) {
    return Observable.throw(error.json());
  }

}
