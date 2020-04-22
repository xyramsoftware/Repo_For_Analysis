import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Rx";
import {ConstantService} from '../../../constant.service';

@Injectable()
export class RegisterService {

  constructor(public http: Http, public constantService: ConstantService) {
  }

  registerData(register: any) {
    const body = JSON.stringify(register);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.constantService.API_ENDPOINT + 'users', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error.json());

  }
}
