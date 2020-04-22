import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
//import  "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import {map} from 'rxjs/Operator/map'
import {ConstService} from "../../providers/const-service";

@Injectable()

export class HomeService {
    constructor(public http: Http, public constService: ConstService) {

    }

    getCategories() {
        const headers = new Headers();
        return this.http.get(this.constService.base_url + 'api/categories', {
            headers: headers
        }) 
            .map((data: Response)=> data.json()|| {})
           // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

            //.map((data: Response) => data.json())
    }

    getUpcomings() {
        const headers = new Headers();
        return this.http.get(this.constService.base_url + 'api/upcomings', {
            headers: headers
        }) 
            .map((data: Response)=> data.json()|| {})
            //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));

            //.map((data: Response) => data.json())
    }

    
    getSocialCount() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/socialMedia/all', {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    //  UpdateCount(id) {
    //     const headers = new Headers();
    //     let authtoken = localStorage.getItem('token');
    //     headers.append('Authorization', authtoken);
    //     return this.http.get(this.constService.base_url + 'api/referFriends/update/'+id, {
    //         headers: headers
    //     })
    //         .map((data: Response) => data.json() || {})
    //        // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    // }

    UpdateCount(data, couponId: any) {
        const body = JSON.stringify(data);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http
          .put(this.constService.base_url + 'api/socialMedia/update/media/' + couponId, body, {
            headers: headers
          })
          .map((data: Response) => data.json())
         
      }

    getCaroselDate() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/carousel/all', {
            headers: headers
        }) 
        .map((data: Response) => data.json() || {})
            //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));

            //.map((data: Response) => data.json())
    }

}
