import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {map} from 'rxjs/Operator/map'
import {ConstService} from "../../providers/const-service";

@Injectable()

export class ChatService {
    constructor(public http: Http, public constService: ConstService) {

    }

    getChatList(sellerId) {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/messages/user/' + sellerId, {
            headers: headers
        })
            .map((data: Response) => data.json())
    }

    getGalary() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/gallery/all', {
            headers: headers
        })
            .map((data: Response) => data.json())
    }

    getGalaryLimitImages(page:any,limit:any) {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/gallery/bypage?page='+page+'&limit='+limit, {
            headers: headers
        })
            .map((data: Response) => data.json())
    }

    sendMessage(chatData) {
        const body = JSON.stringify(chatData);
        console.log("body" + body);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.post(this.constService.base_url + 'api/messages/', body, {
            headers: headers
        })
            .map((data: Response) => data.json())
    }

    getRestaurantInfo() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/users/store/info', {
            headers: headers
        })
            .map((data: Response) => data.json())
    }

    createVoluntree(files:any) {
        //const body = JSON.stringify(user);
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
       // headers.append('Content-Type', 'multipart/form-data');
      // headers.append('Content-Type', 'application/json');
        return this.http.post(this.constService.base_url + 'api/volunteer', files, {
            headers: headers
        })
            // .map((data: Response) => data.json() || {})
            .map((data: Response) => data.json() || {})
            //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    //////////////////////////
    getQrcodeFields() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/volunteerqrcode/all/'+this.constService.clientId, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    GetForms() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/volunteerforms/all/'+this.constService.clientId, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    createUser(payload:any) {
        //const body = JSON.stringify(payload);
        const headers = new Headers();
      // headers.append('Content-Type', 'multipart/form-data');
      //headers.append('Content-Type', 'application/json');
        return this.http.post(this.constService.base_url + 'api/volunteer/create/'+this.constService.clientId, payload, {
            headers: headers
        })
            // .map((data: Response) => data.json() || {})
            .map((data: Response) => data.json() || {})
            //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


}
