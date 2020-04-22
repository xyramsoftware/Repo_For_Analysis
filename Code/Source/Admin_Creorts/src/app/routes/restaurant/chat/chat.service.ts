import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Rx";
import {userlist, chatData, userId} from './chat';
import {ConstantService} from '../../../constant.service';


@Injectable()
export class ChatService {
  authToken: any;

  constructor(private http: Http, public constantService: ConstantService) {
    this.authToken = localStorage.getItem('token');
  }


  getChatList(): Observable<userlist[]> {
    const headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.constantService.API_ENDPOINT + 'messages/seller/index', {
      headers: headers
    })
      .map(this.extractUserData)
      .catch(this.handleError);
  }


  getMessageData(userId): Observable<chatData> {
    console.log(" chat message")
    const headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.constantService.API_ENDPOINT + 'messages/' + userId, {
      headers: headers
    })
      .map(this.extractFollowerData)
      .catch(this.handleError);
  }

  saveMessageData(chatData): Observable<chatData> {
    const body = JSON.stringify(chatData);
    const headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.constantService.API_ENDPOINT + 'messages/', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
  }

  searchUsersData(searchKey: any, flag: number) { //Employee as well as users
    const headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.constantService.API_ENDPOINT + 'users/search/chat/' + searchKey + '/' + flag, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  private extractUserData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private extractFollowerData(res: Response) {
    let body = res.json();
    return body || [];
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

  getUsersData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'users', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  /////////////////////////////////////////

  getQrcodeFields() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    let clientid=localStorage.getItem('id')
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'volunteerqrcode/all/' + clientid, {
      headers: headers
    })
      .map((data: Response) => data.json())
      ///.catch(this.handleError)
  }

  addRegForms(data: any) {
    const body = JSON.stringify(data);
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    let clientId = localStorage.getItem('id')
    headers.append('Authorization', authToken);
    return this.http
      .post(this.constantService.API_ENDPOINT + 'volunteerforms/create/'+clientId, body, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  getAllfields() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    let clientId = localStorage.getItem('id')
    headers.append('Authorization', authToken);
    return this.http
      .get(this.constantService.API_ENDPOINT + 'volunteerforms/all/'+clientId, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }
  //Update 
  updateRegFieldsById(data: any, Id: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    let clientId = localStorage.getItem('id')
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'volunteerforms/update/'+clientId+'/'+ Id, body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      //.catch(this.handleError)
  }
  addQRCodeFields(data: any) {
    const body = JSON.stringify(data);
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    let clientId = localStorage.getItem('id')
    headers.append('Authorization', authToken);
    return this.http
      .post(this.constantService.API_ENDPOINT + 'volunteerqrcode/create/'+clientId, body, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  deletePickupItemById(Id: any) {
    const headers = new Headers();
    let authToken = localStorage.getItem('token');
    let ClientId = localStorage.getItem('id')
    headers.append('Authorization', authToken);
    return this.http.delete(this.constantService.API_ENDPOINT + 'volunteerforms/delete/'+ClientId+'/'+Id, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError)
  }

  UpdateQrCodeFields(id:any,data:any){

    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    let clientId = localStorage.getItem('id')
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'volunteerqrcode/update/'+clientId+'/'+ id, body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      //.catch(this.handleError)

  }
}
