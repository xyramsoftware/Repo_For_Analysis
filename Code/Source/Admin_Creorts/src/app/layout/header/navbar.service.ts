'use strict';
import { Injectable,OnInit } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";
import { ConstantService } from  '../../constant.service';

@Injectable()
export class NavBarService {
    authToken:any;
    url: any = 'https://onesignal.com/api/v1/notifications';
    constructor(private http: Http, public constantService: ConstantService) {
       this.authToken=localStorage.getItem('token');
    }


  // saveCategoryData(data: any) {
  //       const body = JSON.stringify(data);
  //       console.log(body);
  //       const headers = new Headers();
  //        headers.append('Content-Type', 'application/json');
  //        let authToken = localStorage.getItem('token');
  //        headers.append('Authorization', authToken);
  //        return this.http.post(this.constantService.API_ENDPOINT+'categories', body, {
  //       headers: headers
  //   })
  //   .map((data: Response) => data.json())
  //    .catch(this.handleError);
  //  }

    getUnreadNotificationData(){
          const headers = new Headers();
           headers.append('Content-Type', 'application/json');
           let authToken = localStorage.getItem('token');
           headers.append('Authorization', authToken);
           return this.http.get(this.constantService.API_ENDPOINT+'notifications/unread/all', {
          headers: headers
      })
      .map((data: Response) => data.json())
       .catch(this.handleError);
   }

    gettingcolore(){
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let authToken = localStorage.getItem('token');
      let clientId = localStorage.getItem('id');
      headers.append('Authorization', authToken);
      return this.http.get(this.constantService.API_ENDPOINT+'dashboard/all/'+clientId, {
     headers: headers
 })
 .map((data: Response) => data.json())
  .catch(this.handleError);
    }

   getUnreadMessageNotificationData(){
          const headers = new Headers();
           headers.append('Content-Type', 'application/json');
           let authToken = localStorage.getItem('token');
           headers.append('Authorization', authToken);
           return this.http.get(this.constantService.API_ENDPOINT+'messages/counts/1', {
          headers: headers
      })
      .map((data: Response) => data.json())
       .catch(this.handleError);
   }

   readUserMessage(userId){
           const headers = new Headers();
           headers.append('Content-Type', 'application/json');
           let authToken = localStorage.getItem('token');
           headers.append('Authorization', authToken);
           return this.http.get(this.constantService.API_ENDPOINT+'messages/update/byseller/'+userId, {
          headers: headers
      })
      .map((data: Response) => data.json())
       .catch(this.handleError);
   }

   readAllNotifications(){
       const headers = new Headers();
         headers.append('Content-Type', 'application/json');
         let authToken = localStorage.getItem('token');
         headers.append('Authorization', authToken);
         return this.http.get(this.constantService.API_ENDPOINT+'notifications/all/read', {
        headers: headers
    })
    .map((data: Response) => data.json())
     .catch(this.handleError);
   }

   sendNotification(message){  
    const body = JSON.stringify(message);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic YThiOTlmMDAtOWJjZC00ZGI0LWFhMTAtMzRlNTExOTE2MGVm');
    return this.http.post(this.url, body, {
      headers: headers
    }).map((data: Response) => data.json())
  }
//
// getCategoryDetails(categoryId: any) {
//         const headers = new Headers();
//          headers.append('Content-Type', 'application/json');
//          let authToken = localStorage.getItem('token');
//          headers.append('Authorization', authToken);
//          return this.http.get(this.constantService.API_ENDPOINT+'categories/'+categoryId, {
//          headers: headers
//     })
//     .map((data: Response) => data.json())
//      .catch(this.handleError);
//    }

   // getSubCategoryData(categoryId: any) {
   //      const headers = new Headers();
   //       headers.append('Content-Type', 'application/json');
   //       let authToken = localStorage.getItem('token');
   //       headers.append('Authorization', authToken);
   //       return this.http.get(this.constantService.API_ENDPOINT+'subcategories/by/category/'+categoryId, {
   //       headers: headers
   //  })
   //  .map((data: Response) => data.json())
   //   .catch(this.handleError);
//   }

   UpdateNotificationData(data, notifyId: any) {
       const body = JSON.stringify(data);
        const headers = new Headers();
         headers.append('Content-Type', 'application/json');
         let authToken = localStorage.getItem('token');
         headers.append('Authorization', authToken);
         return this.http.put(this.constantService.API_ENDPOINT+'notifications/'+notifyId, body,{
         headers: headers
    }).map((data: Response) => data.json())
     .catch(this.handleError);
   }

   //Get All Orders
  getOrdersData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'orders/getorders', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }
  
   // deleteCategoryData (id : any){
   //       const headers = new Headers();
   //       let authToken = localStorage.getItem('token');
   //       headers.append('Authorization', authToken);
   //       return this.http.delete(this.constantService.API_ENDPOINT+'categories/'+id, {
   //       headers: headers
   //  }).map((data: Response) => data)
   //   .catch(this.handleError);
   // }
 private handleError (error: any) {
   return Observable.throw(error);
}


}
