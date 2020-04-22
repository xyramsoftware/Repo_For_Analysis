import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import  "rxjs/Rx";
//import {Observable} from "rxjs/Observable";
// import { map } from 'rxjs/operators';
import {ConstService} from "../const.service";

@Injectable()
export class PatientService {

    constructor(private http: Http,
                public constService: ConstService) {
    }


    login(user: any) {
        const body = JSON.stringify(user);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.constService.base_url + 'auth/local', body, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
           // .pipe(map((response: any) => response.json()));
            //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getPatientList(id) {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        console.log(authtoken)
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/Patients/by/user/'+id, {
            headers: headers
        })

            .map((data: Response) => data.json() || {})
           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
