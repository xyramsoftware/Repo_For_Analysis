import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {map} from 'rxjs/Operator/map'
import {ConstService} from "./const-service";

@Injectable()

export class UserService {
    constructor(public http: Http, public constService: ConstService) {

    }

    getUser() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        console.log(authtoken)
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'auth/local/users/by/me', {
            headers: headers
        })

            .map((data: Response) => data.json() || {})
           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    GetingScreens() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/screens/all/'+this.constService.clientId, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    GetAppSettings() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/appsettings/all/'+this.constService.clientId, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    GetClientDetailsById() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/clients/byId/'+this.constService.clientId, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
