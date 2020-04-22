import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {map} from 'rxjs/Operator/map'
import {ConstService} from "../../providers/const-service";


@Injectable()
export class OrdersService {

    constructor(private http: Http,
                public constService: ConstService) {
    }


    getOrders() {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/orders/user/allorders', {
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

    wishListPost(item: any) {
        const body = JSON.stringify(item);
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.constService.base_url + 'api/wishlists/create/', body, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
            //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    GettingwishlistbyUserid(Id){
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/wishlists/byuser/'+ Id, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deletewishlistByUserId(userid:any,eventid:any) {
        const headers = new Headers();
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.delete(this.constService.base_url + 'api/wishlists/delete/'+ userid+'/'+ eventid, {
          headers: headers
        })
        //   .map((data: Response) => data)
        //   .catch(this.handleError)
      }
    
      private handleError(error: any) {
        return Observable.throw(error.json());
    
      }



}
