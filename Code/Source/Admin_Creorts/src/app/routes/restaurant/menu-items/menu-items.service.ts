import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../constant.service';

@Injectable()
export class MenuItemsService {
  constructor(public http: Http, public constantService: ConstantService) {}

  //Get All Menu Items
  // getMenuItemsData() {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   let authToken = localStorage.getItem('token');
  //   headers.append('Authorization', authToken);
  //   return this.http
  //     .get(this.constantService.API_ENDPOINT + 'categories', {
  //       headers: headers
  //     })
  //     .map((data: Response) => data.json())
  //     .catch(this.handleError);
  // }

  //get screens List
  getAllScreens(clientid:any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http
      .get(this.constantService.API_ENDPOINT + 'screens/all/'+clientid, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  //Get Menu Item By Id
  getMenuItemById(menuId: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http
      .get(this.constantService.API_ENDPOINT + 'categories/' + menuId, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  //Add menu Items
  addMenuItems(data: any) {
    const body = JSON.stringify(data);
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http
      .post(this.constantService.API_ENDPOINT + 'categories', body, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

   //Add menu Items
   addScreens(data: any) {
    const body = JSON.stringify(data);
    console.log(body);
    const headers = new Headers();
   let clientId = localStorage.getItem('id')
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http
      .post(this.constantService.API_ENDPOINT + 'screens/'+clientId, body, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  // update screen Item

  updateScreenItems(data: any, screenId: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    let clientId = localStorage.getItem('id')
    headers.append('Authorization', authToken);
    return this.http
      .put(this.constantService.API_ENDPOINT + 'screens/'+clientId+'/'+ screenId, body, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }


  //Update Menu By Id
  updateMenuItems(data: any, menuId: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let clientId = localStorage.getItem('id')
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http
      .put(this.constantService.API_ENDPOINT + 'categories/' +clientId+'/'+ menuId, body, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  //Delete Menu Item By Id
  deleteScreenId(screenId: any) {
    const headers = new Headers();
    let authToken = localStorage.getItem('token');
    let clientId = localStorage.getItem('id')
    headers.append('Authorization', authToken);
    return this.http
      .delete(this.constantService.API_ENDPOINT + 'screens/'+clientId+'/' + screenId, {
        headers: headers
      })
      .map((data: Response) => data)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error.json());
  }
}
