import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {map} from 'rxjs/Operator/map'
import {ConstService} from "../../providers/const-service";


@Injectable()
export class WishlistService {

    constructor(private http: Http,
                public constService: ConstService) {
    }


   

   
   

    GettingwishlistbyUserid(Id){
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/wishlists/byuser/'+this.constService.clientId+'/'+ Id, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
          //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deletewishlistByUserId(userid:any,eventid:any) {
        const headers = new Headers();
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        return this.http.delete(this.constService.base_url + 'api/wishlists/delete/'+this.constService.clientId+'/'+ userid+'/'+ eventid, {
          headers: headers
        })
        //   .map((data: Response) => data)
        //   .catch(this.handleError)
      }
    
      private handleError(error: any) {
        return Observable.throw(error.json());
    
      }



}
