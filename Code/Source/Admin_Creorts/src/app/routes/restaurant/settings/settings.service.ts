import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../constant.service';

@Injectable()
export class SettingsService {
  constructor(public http: Http, public constantService: ConstantService) {}

  //getting APP color

  gettingAppSettings(){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    let clientId = localStorage.getItem('id');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT+'appsettings/all', {
   headers: headers
})
.map((data: Response) => data.json())
.catch(this.handleError);
  }


  // Header Color post

   PostDashBoardSettings(setting: any) {
    const body = JSON.stringify(setting);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let clientid = localStorage.getItem('id')
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http
      .post(this.constantService.API_ENDPOINT + 'dashboard/color', body, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }
  PostAppsettings(setting: any) {
    const body = JSON.stringify(setting);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let clientid = localStorage.getItem('id')
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http
      .post(this.constantService.API_ENDPOINT + 'appsettings/color', body, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  // Header Color Update
  updateDashBoardData(data: any, settingId: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    let clientid = localStorage.getItem('id')
    headers.append('Authorization', authToken);
    return this.http
      .put(this.constantService.API_ENDPOINT + 'dashboard/'+ settingId, body, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  // Header Color Update
  updateAppSettingsData(data: any, settingId: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    let clientid = localStorage.getItem('id')
    headers.append('Authorization', authToken);
    return this.http
      .put(this.constantService.API_ENDPOINT + 'appsettings/'+ settingId, body, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  updateDashBoardImageData(data: any, settingId: any) {
    //const body = JSON.stringify(data);
    const headers = new Headers();
     //headers.append('Content-Type', 'multipart/form-data');
    // let authToken = localStorage.getItem('token');
    let clientid = localStorage.getItem('id')
   // headers.append('Authorization', authToken);
    return this.http
      .put(this.constantService.API_ENDPOINT + 'dashboard/update/'+ settingId, data, {
        headers: headers
      })
      // .map((data: Response) => data.json())
      // .catch(this.handleError);
  }

  updateAppImageData(data: any, settingId: any) {
    //const body = JSON.stringify(data);
    const headers = new Headers();
     //headers.append('Content-Type', 'multipart/form-data');
    // let authToken = localStorage.getItem('token');
    let clientid = localStorage.getItem('id')
   // headers.append('Authorization', authToken);
    return this.http
      .put(this.constantService.API_ENDPOINT + 'appsettings/update/'+ settingId, data, {
        headers: headers
      })
      // .map((data: Response) => data.json())
      // .catch(this.handleError);
  }

  

  

 

  private handleError(error: any) {
    return Observable.throw(error.json());
  }
}
