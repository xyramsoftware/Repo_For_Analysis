import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {map} from 'rxjs/Operator/map'
import {ConstService} from "../../providers/const-service";


@Injectable()
export class ContactService {

    constructor(private http: Http,
                public constService: ConstService) {
    }


    getFavourites(userId) {
        const headers = new Headers();
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.get(this.constService.base_url + 'api/favourites/user/fav/', {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    removeFromFavourite(productId) {
        let productInfo: any = {};
        productInfo.menuItem = productId;
        productInfo.userReaction = 'DISLIKE';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
        return this.http.post(this.constService.base_url + 'api/favourites/delete/', productInfo, {
            headers: headers
        })
            .map((data: Response) => data.json() || {})
           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
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


    updateUser(Id:any,address:any){
       // console.log("addressId-"+addressId);
        const body =address;
        console.log("body-"+JSON.stringify(body));
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authtoken = localStorage.getItem('token');
        headers.append('Authorization', authtoken);
       return this.http.put(this.constService.base_url+'api/users/eventupdate/'+Id+'/',body, {
           headers: headers
       })
           .map((data: Response)=> data.json()|| {})
         // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   }


   /////////////////////

   
  CreateFeedback(payload:any,userid) {
   // http://localhost:3000/api/feedback/create/:userID
    const body = JSON.stringify(payload);
    const headers = new Headers();
    let authtoken = localStorage.getItem('token');
    headers.append('Authorization', authtoken);
  // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.constService.base_url + 'api/feedback/create/'+userid, payload, {
        headers: headers
    })
        // .map((data: Response) => data.json() || {})
        .map((data: Response) => data.json() || {})
        //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}


GetAllFeedback(userid) {
   /// http://localhost:3000/api/feedback/byuser/:userID
    const headers = new Headers();
    let authtoken = localStorage.getItem('token');
    headers.append('Authorization', authtoken);
    return this.http.get(this.constService.base_url + 'api/feedback/byuser/'+userid, {
        headers: headers
    })
        .map((data: Response) => data.json() || {})
      //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}


//http://localhost:3000/api/eventfeedback/create/:userID/:EventID

CreateFeedbackEvent(payload:any,userid,eventid:any) {
    // http://localhost:3000/api/feedback/create/:userID
     const body = JSON.stringify(payload);
     const headers = new Headers();
     let authtoken = localStorage.getItem('token');
     headers.append('Authorization', authtoken);
   // headers.append('Content-Type', 'multipart/form-data');
     headers.append('Content-Type', 'application/json');
     return this.http.post(this.constService.base_url + 'api/eventfeedback/create/'+userid +'/'+eventid, payload, {
         headers: headers
     })
         // .map((data: Response) => data.json() || {})
         .map((data: Response) => data.json() || {})
         //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
 }
 

    GetAllFeedbackByEvent(userid,eventid) {
    /// http://localhost:3000/api/eventfeedback/byuser/:userID/:EventID
     const headers = new Headers();
     let authtoken = localStorage.getItem('token');
     headers.append('Authorization', authtoken);
     return this.http.get(this.constService.base_url + 'api/eventfeedback/byuser/'+userid+"/"+eventid, {
         headers: headers
     })
         .map((data: Response) => data.json() || {})
       //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
 }




}
