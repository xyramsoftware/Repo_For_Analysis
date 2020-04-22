import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Rx";
import {ConstantService} from '../../../constant.service';
import {SocketSharedService} from '../../../SocketShare.service';

@Injectable()
export class LoginService {

  constructor(public constantService: ConstantService, public http: Http, private socket: SocketSharedService) {
  }

  loginData(login: any) {
    const body = JSON.stringify(login);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.constantService.Login_Auth + 'auth/local/clients?Username='+login.user+'&password='+login.password, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  sendInfoToSocket(id) {
    this.socket.userInfo(id);
  }

  adminData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.Login_Auth + 'api/clients/me/now', {
      headers: headers
    })

      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  gettingcolore(){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientId = localStorage.getItem('admin_id');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT+'dashboard/all/', {
   headers: headers
})
.map((data: Response) => data.json())
.catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error);

  }


}

