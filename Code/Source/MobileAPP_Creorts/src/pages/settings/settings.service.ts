import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {map} from 'rxjs/Operator/map'
import {ConstService} from "../../providers/const-service";

@Injectable()

export class SettingsService {
    constructor(public http: Http, public constService: ConstService) {

    }

     updateUserInfo(userId,userInfo){  
         let body=userInfo;   
         const headers = new Headers();
         let authtoken = localStorage.getItem('token');
         headers.append('Authorization', authtoken);
         headers.append('Content-Type', 'application/json');
        return this.http.put(this.constService.base_url+'api/users/'+userId,body,{
            headers: headers
        })
            .map((data: Response)=> data.json()|| {})
           // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

  

    PostAcomidation(userMail,Paylod:any) {
        const body = JSON.stringify(Paylod);
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
       // headers.append('Content-Type', 'multipart/form-data');
         headers.append('Content-Type', 'application/json');
        return this.http.post(this.constService.base_url + 'api/accomodation/'+userMail, Paylod, {
            headers: headers
        })
            // .map((data: Response) => data.json() || {})
            .map((data: Response) => data.json() || {})
            //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getLatestNwes() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/news/all', {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    GetForms() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/accomodationforms/all/'+this.constService.clientId, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    createUser(payload:any) {
        const body = JSON.stringify(payload);
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
      // headers.append('Content-Type', 'multipart/form-data');
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.constService.base_url + 'api/accomodation/create/'+this.constService.clientId, payload, {
            headers: headers
        })
            // .map((data: Response) => data.json() || {})
            .map((data: Response) => data.json() || {})
            //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    

}
