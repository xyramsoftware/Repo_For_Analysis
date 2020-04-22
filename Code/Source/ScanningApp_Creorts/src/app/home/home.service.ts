import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import  "rxjs/Rx";
//import {Observable} from "rxjs/Observable";
// import { map } from 'rxjs/operators';
import {ConstService} from "../const.service";

@Injectable()
export class LoginService {

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

    getUser() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        console.log(authtoken)
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/users/me', {
            headers: headers
        })

            .map((data: Response) => data.json() || {})
           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

     getUserdetails(RegId) {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        console.log(authtoken)
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/users/byuser/'+RegId, {
            headers: headers
        })

            .map((data: Response) => data.json() || {})
           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getTMdetails(RegId) {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        console.log(authtoken)
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/users/byteam/'+RegId, {
            headers: headers
        })

            .map((data: Response) => data.json() || {})
           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    getTicketsData(RegId) {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        console.log(authtoken)
        headers.append('Authorization', authtoken);
        return this.http.get('http://54.87.206.253:8085/api/admin/getQRCodeDetails/'+RegId, {
            headers: headers
        })

            .map((data: Response) => data.json() || {})
           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getAccompanyDetails(RegId) {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        console.log(authtoken)
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/accompanies/byreg/'+RegId, {
            headers: headers
        })

            .map((data: Response) => data.json() || {})
           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateTickets(data:any){
        // console.log("addressId-"+addressId);
         const body =data;
         console.log("body-"+JSON.stringify(body));
         const headers = new Headers();
         headers.append('Content-Type', 'application/json');
         let authtoken = localStorage.getItem('token');
         headers.append('Authorization', authtoken);
        // http://54.87.206.253:8085/api/admin/updateTicket
        return this.http.put('http://54.87.206.253:8085/api/admin/updateTicket',body, {
            headers: headers
        })
            .map((data: Response)=> data.json()|| {})
          // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateUser(Id:any,data:any){
        // console.log("addressId-"+addressId);
         const body =data;
         console.log("body-"+JSON.stringify(body));
         const headers = new Headers();
         headers.append('Content-Type', 'application/json');
         let authtoken = localStorage.getItem('token');
         headers.append('Authorization', authtoken);
        return this.http.put(this.constService.base_url+'api/users/update/'+Id+'/',body, {
            headers: headers
        })
            .map((data: Response)=> data.json()|| {})
          // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateCount(Id:any,data:any){
        // console.log("addressId-"+addressId);
         const body =data;
         console.log("body-"+JSON.stringify(body));
         const headers = new Headers();
         headers.append('Content-Type', 'application/json');
         let authtoken = localStorage.getItem('token');
         headers.append('Authorization', authtoken);
        return this.http.put(this.constService.base_url+'api/events/scan/count/'+Id+'/',body, {
            headers: headers
        })
            .map((data: Response)=> data.json()|| {})
          // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateAccompany(Id:any,data:any){
        // console.log("addressId-"+addressId);
         const body =data;
         console.log("body-"+JSON.stringify(body));
         const headers = new Headers();
         headers.append('Content-Type', 'application/json');
         let authtoken = localStorage.getItem('token');
         headers.append('Authorization', authtoken);
        return this.http.put(this.constService.base_url+'api/accompanies/updatereg/'+Id+'/',body, {
            headers: headers
        })
            .map((data: Response)=> data.json()|| {})
          // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateTeamMember(Id:any,data:any){
        // console.log("addressId-"+addressId);
         const body =data;
         console.log("body-"+JSON.stringify(body));
         const headers = new Headers();
         headers.append('Content-Type', 'application/json');
         let authtoken = localStorage.getItem('token');
         headers.append('Authorization', authtoken);
        return this.http.put(this.constService.base_url+'api/users/updateTM/'+Id+'/',body, {
            headers: headers
        })
            .map((data: Response)=> data.json()|| {})
          // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
 
 


    GettingEventId(Id){
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/events/bydates/'+ Id, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getCategory() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/dates/all', {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
