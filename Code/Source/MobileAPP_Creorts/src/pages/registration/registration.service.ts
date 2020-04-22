import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {map} from 'rxjs/Operator/map'
import {ConstService} from "../../providers/const-service";

@Injectable()
export class RegistrationService {

    constructor(private http: Http,
                public constService: ConstService) {
    }


    createUser(payload:any) {
        //const body = JSON.stringify(payload);
        const headers = new Headers();
      // headers.append('Content-Type', 'multipart/form-data');
      //headers.append('Content-Type', 'application/json');
        return this.http.post(this.constService.base_url + 'api/users/create', payload, {
            headers: headers
        })
            // .map((data: Response) => data.json() || {})
            .map((data: Response) => data.json() || {})
            //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    ValidateUser(number:any) {
        //const body = JSON.stringify(payload);
        const headers = new Headers();
      // headers.append('Content-Type', 'multipart/form-data');
     // headers.append('Content-Type', 'application/json');
        return this.http.post(this.constService.base_url + 'api/users/by/'+number, {
            headers: headers
        })
            // .map((data: Response) => data.json() || {})
            .map((data: Response) => data.json() || {})
            //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }



    GetScreens() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/screens/all', {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    GetForms(screenid) {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/regforms/all/'+screenid, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    GetAllEvents() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/events/all', {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    GetAllcategory() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/categories/all', {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    GetEventsBYcategory(categoryID:any) {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/events/bycategory/'+categoryID, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getQrcodeFields() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/qrcode/all', {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    getallEvents() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/events/all', {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    geteventsByEventType(catId:any,eventtypeId:any) {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/events/bytype/'+catId+'/'+eventtypeId, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    getallEventsTypes() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/type/all', {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    

    getcontryList() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get('https://isc2020uasb.org/wp-json/api/v1/all_countries', {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }



    GetAvilabaleUserName(username) {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/users/by/Username?search='+username, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
