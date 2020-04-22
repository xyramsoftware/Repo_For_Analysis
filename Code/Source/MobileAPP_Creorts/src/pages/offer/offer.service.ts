import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {map} from 'rxjs/Operator/map'
import {ConstService} from "../../providers/const-service";


@Injectable()
export class OfferService {

    constructor(private http: Http,
                public constService: ConstService) {
    }


    getMenuItems() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/menuItems/', {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    createaccompany(Obj:any,Id:any) {
        //const body = JSON.stringify(user);
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
       // headers.append('Content-Type', 'multipart/form-data');
         headers.append('Content-Type', 'application/json');
        return this.http.post(this.constService.base_url + 'api/accompanies/create/'+Id, Obj, {
            headers: headers
        })
            // .map((data: Response) => data.json() || {})
            .map((data: Response) => data.json() || {})
            //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


     PickUpAndDrop(Payload:any,usermail:any) {
        const body = JSON.stringify(Payload);
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
       // headers.append('Content-Type', 'multipart/form-data');
      // headers.append('Content-Type', 'application/json');
        return this.http.post(this.constService.base_url + 'api/pickupaddress/'+usermail, Payload, {
            headers: headers
        })
            // .map((data: Response) => data.json() || {})
            .map((data: Response) => data.json() || {})
            //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    getACccompanyperson(userid) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authtoken = localStorage.getItem('token');
        // let ClientId =  localStorage.getItem('id');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/accompanies/byuser/'+userid, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

  //  http://localhost:3000/api/pickupaddress/by/user/5da83e38f1fb3636a42d5d93


  GetForms() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authtoken = localStorage.getItem('token');
    headers.append('Authorization', authtoken);
    return this.http.get(this.constService.base_url + 'api/accompanyforms/all', {
        headers: headers
    })
        .map((data: Response) => data.json() || {})
      //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}

getQrcodeFields() {
    const headers = new Headers();
    let authtoken = localStorage.getItem('token');
    headers.append('Authorization', authtoken);
    return this.http.get(this.constService.base_url + 'api/accompanyqrcode/all', {
        headers: headers
    })
        .map((data: Response) => data.json() || {})
      //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}


createUser(payload:any) {
    //const body = JSON.stringify(payload);
    const headers = new Headers();
    let authtoken = localStorage.getItem('token');
    headers.append('Authorization', authtoken);
  // headers.append('Content-Type', 'multipart/form-data');
  //headers.append('Content-Type', 'application/json');
    return this.http.post(this.constService.base_url + 'api/accompanies/create/', payload, {
        headers: headers
    })
        // .map((data: Response) => data.json() || {})
        .map((data: Response) => data.json() || {})
        //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}

    getPickupAndDrop(userid) {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/pickups/byuser/'+userid, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    
////////////////////////////////

GetFormsForPIckUP() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authtoken = localStorage.getItem('token');
    headers.append('Authorization', authtoken);
    return this.http.get(this.constService.base_url + 'api/pickupform/all/', {
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

AddPickUpAndDrop(payload:any) {
    const body = JSON.stringify(payload);
    const headers = new Headers();
    let authtoken = localStorage.getItem('token');
    headers.append('Authorization', authtoken);
  // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.constService.base_url + 'api/pickups/create/', payload, {
        headers: headers
    })
        // .map((data: Response) => data.json() || {})
        .map((data: Response) => data.json() || {})
        //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}

}
