import {Injectable} from '@angular/core';
import {Http, Response, Headers,RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';

@Injectable()

export class NewsService {

  constructor(public http: Http, public constantService: ConstantService) {
  }

  //Get All News
  getNewsData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'news', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }


  //Get Carosels By Id
  getCaroselById(Id: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let ClientId = localStorage.getItem('admin_id')
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'carousel/byId/'+Id, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  //Add New News
  addNewsData(data: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http.post(this.constantService.API_ENDPOINT + 'news', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  //Update News By Id
  updateNews(data: any, newsId: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'news/' + newsId, body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  //Delete News By Id
  deleteNewsById(newsId: any) {
    const headers = new Headers();
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http.delete(this.constantService.API_ENDPOINT + 'news/' + newsId, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError)
  }

   // get carosels
  getCarosels() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientId = localStorage.getItem("id")
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'carousel/all', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }


  //Add Carosel data 
  addCaroselData(data: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientId = localStorage.getItem("id")
    headers.append('Authorization', authToken);
    return this.http.post(this.constantService.API_ENDPOINT + 'carousel/create', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  // update Carosel data
  UpdateCaroselData(id:any,data: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientId = localStorage.getItem("id")
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'carousel/update/'+id, body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  CurasoulsImage(Id:any,files:any) {
    console.log(files)
    
    let headers = new Headers();
   // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let ClientId = localStorage.getItem("id")
    headers.append('Authorization', authToken);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.constantService.API_ENDPOINT + 'carousel/upload/'+Id, files, {
      
      headers: headers
    })
    //.map((data: Response) => data.json())
      //.catch(this.handleError)
  }


  deleteCurasoulsById(Id: any) {
    const headers = new Headers();
    let authToken = localStorage.getItem('admintoken');
    let clientId = localStorage.getItem('admin_id')
    headers.append('Authorization', authToken);
    return this.http.delete(this.constantService.API_ENDPOINT + 'carousel/delete/'+Id, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError)
  }


  private handleError(error: any) {
    return Observable.throw(error.json());
  }

}
