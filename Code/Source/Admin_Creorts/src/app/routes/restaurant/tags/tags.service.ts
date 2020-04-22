import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';

@Injectable()

export class TagsService {

  constructor(public http: Http, public constantService: ConstantService) {
  }

  //Get Tags
  getTagsData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'tags', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  //Get Tag By Its Id
  getTagById(tagId: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'tags/' + tagId, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  //Update Tags
  updateTagById(data, tagId: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'tags/' + tagId, body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }


  //Add New Tag
  addTagData(tag: any) {
    const body = JSON.stringify(tag);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.post(this.constantService.API_ENDPOINT + 'tags', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  //Delete Tag By Id
  deleteTagData(tagId: any) {
    const headers = new Headers();
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.delete(this.constantService.API_ENDPOINT + 'tags/' + tagId, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError)
  }

  private handleError(error: any) {
    return Observable.throw(error.json());

  }
}
