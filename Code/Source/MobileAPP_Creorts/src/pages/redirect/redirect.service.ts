import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {map} from 'rxjs/Operator/map'
import {ConstService} from "../../providers/const-service";


@Injectable()
export class RedirectService {

    constructor(private http: Http,
                public constService:ConstService) {
    }

    socialAuthentication(auth){
         const headers = new Headers();
         headers.append('Content-Type', 'application/json');
        //  let authtoken = localStorage.getItem('token');
         headers.append('authorization', 'Bearer ' + auth);
        return this.http.get(this.constService.java_base_URL+'user/me',{
            headers: headers
        })
            .map((data: Response)=> data.json()|| {})
          //  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
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

    getUserDetailsByEmail(obj:any){
        const headers = new Headers();
       // http://localhost:3000/auth/local/users/socialmedia/login
        // headers.append('Content-Type', 'application/json');
        // let authtoken = localStorage.getItem('token');
        // headers.append('authorization', 'Bearer ' + auth);
       return this.http.post(this.constService.base_url+'auth/local/users/socialmedia/login',obj,{
           headers: headers
       })
           .map((data: Response)=> data.json()|| {})
         //  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   }
}