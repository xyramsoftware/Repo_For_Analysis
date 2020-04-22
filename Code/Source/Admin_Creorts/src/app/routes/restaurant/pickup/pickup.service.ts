import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';

@Injectable()

export class PickupItemsService {

  constructor(public http: Http, public constantService: ConstantService) {
  }

  //Get All 
  getAccompanyFields() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientId = localStorage.getItem('admin_id')
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'accompanyforms/all/'+clientId, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  //get Category List
  getCategoryData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'categories', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  //Get Menu Item By Id
  getPrescriptionId(menuId: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'prescription/' + menuId, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  //Add Accompany Person
  addAccompanyPerson(data: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientid = localStorage.getItem('admin_id')
    headers.append('Authorization', authToken);
    return this.http.post(this.constantService.API_ENDPOINT + 'accompanyforms/create/'+clientid, body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  //Update Menu By Id
  updatePrescriptionID(data: any, menuId: any,mailID) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'prescription/status/' + menuId+'/'+ mailID, body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }


  addQRCodeFields(data: any) {
    const body = JSON.stringify(data);
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientId = localStorage.getItem('admin_id')
    headers.append('Authorization', authToken);
    return this.http
      .post(this.constantService.API_ENDPOINT + 'accompanyqrcode/create/'+clientId, body, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }


  getQrcodeFields() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientid=localStorage.getItem('admin_id')
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'accompanyqrcode/all/' + clientid, {
      headers: headers
    })
      .map((data: Response) => data.json())
      ///.catch(this.handleError)
  }

  UpdateQrCodeFields(id:any,data:any){

    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientId = localStorage.getItem('admin_id')
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'accompanyqrcode/update/'+clientId+'/'+ id, body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      //.catch(this.handleError)

  }

   //Update 
   updateRegFieldsById(data: any, Id: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientId = localStorage.getItem('admin_id')
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'accompanyforms/update/'+clientId+'/'+ Id, body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      //.catch(this.handleError)
  }

  //Delete Menu Item By Id
  deletePickupItemById(pickItemId: any) {
    const headers = new Headers();
    let authToken = localStorage.getItem('admintoken');
    let ClientId = localStorage.getItem('admin_id')
    headers.append('Authorization', authToken);
    return this.http.delete(this.constantService.API_ENDPOINT + 'accompanyforms/delete/'+ClientId+'/'+ pickItemId, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError)
  }
//////////////////////////////////////////
  GalleryUpload(files:any) {
    console.log(files)
    
    let headers = new Headers();
   // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    //let options = new RequestOptions({ headers: headers });
    return this.http.post(this.constantService.API_ENDPOINT + 'gallery/create', files, {
      
      headers: headers
    })
    .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  getGalleryData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'gallery/all', {
      headers: headers
    })
      .map((data: Response) => data.json())
      ///.catch(this.handleError)
  }
  
   //Delete Menu Item By Id
   deleteGallery(pickItemId: any) {
    const headers = new Headers();
    let authToken = localStorage.getItem('admintoken');
    
    headers.append('Authorization', authToken);
    return this.http.delete(this.constantService.API_ENDPOINT + 'gallery/delete/'+ pickItemId, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError)
  }

  private handleError(error: any) {
    return Observable.throw(error.json());
  }

}
