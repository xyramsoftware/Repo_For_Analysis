import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';

@Injectable()

export class ContactUsService {

  constructor(public http: Http, public constantService: ConstantService) {
  }

  //Get Contacts Data
  getContactsData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'contacts', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }


  getNews() {
    const headers = new Headers();
    let clientId = localStorage.getItem('admin_id')
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.constantService.API_ENDPOINT + 'news/all', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  getNewsById(Id) {
    const headers = new Headers();
    let clientId = localStorage.getItem('admin_id')
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.constantService.API_ENDPOINT + 'news/byId/'+Id, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }
  
  addNews(category: any) {
    const body = JSON.stringify(category);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http.post(this.constantService.API_ENDPOINT + 'news/create', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }



    
  updateNewsById(news: any,id:any) {
    const body = JSON.stringify(news);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'news/update/' + id, body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  deleteLatestNewa(Id: any) {
    const headers = new Headers();
    let authToken = localStorage.getItem('admintoken');
    let clientId = localStorage.getItem('admin_id')
    headers.append('Authorization', authToken);
    return this.http.delete(this.constantService.API_ENDPOINT + 'news/delete/'+ Id, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError)
  }

  private handleError(error: any) {
    return Observable.throw(error.json());
  }

}
