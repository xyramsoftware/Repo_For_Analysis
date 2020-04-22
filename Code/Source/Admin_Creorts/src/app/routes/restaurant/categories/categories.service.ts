import {Injectable} from '@angular/core';
import {Http, Response,RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';

@Injectable()

export class CategoriesService {

  constructor(public http: Http, public constantService: ConstantService) {
  }

  //getting AllCategory
  getCategoryData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.constantService.API_ENDPOINT + 'categories', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }


   //getting AllCategory
   getEventData() {
    const headers = new Headers();
    let clientId = localStorage.getItem('id')
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.constantService.API_ENDPOINT + 'events/all/', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

   //getting Evant Dates
   getEventDates() {
    const headers = new Headers();
    let clientId = localStorage.getItem('id')
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.constantService.API_ENDPOINT + 'dates/all/', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  //getting Category Data
   getCategoryallData() {
    const headers = new Headers();
    let clientId = localStorage.getItem('id')
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.constantService.API_ENDPOINT + 'dates/all/', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

   //getting Category
   getCatogory() {
    const headers = new Headers();
    let clientId = localStorage.getItem('id')
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.constantService.API_ENDPOINT + 'categories/all/', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }


  //getting Category
  getEventType() {
    const headers = new Headers();
    let clientId = localStorage.getItem('id')
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.constantService.API_ENDPOINT + 'type/all', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  //getting Category By its Id

  getEventById(eventId: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    let clientId=localStorage.getItem('id')
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'events/byId/'+eventId, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }


  
  //Update Category By Its Id
  updateEventById(data, eventID: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientId=localStorage.getItem('id')
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'events/update/'+ eventID, body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  //Adding New Category
  addCategoryData(category: any) {
    const body = JSON.stringify(category);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.post(this.constantService.API_ENDPOINT + 'categories', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }


   //Adding New Events
   addEventData(category: any) {
    const body = JSON.stringify(category);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let clientId = localStorage.getItem("id")
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.post(this.constantService.API_ENDPOINT + 'events/create/', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

   //Adding  Events Dates
   addEventDates(category: any) {
    const body = JSON.stringify(category);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let clientId = localStorage.getItem("id")
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.post(this.constantService.API_ENDPOINT + 'dates/create/', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

   //Adding  Categorys
   addCatogory(category: any) {
    const body = JSON.stringify(category);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let clientId = localStorage.getItem("id")
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    return this.http.post(this.constantService.API_ENDPOINT + 'categories/create/', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

//Adding New Test
addTestData(category: any,code:any) {

  console.log(category)
  const body = JSON.stringify(category);
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('token');
  headers.append('Authorization', authToken);
  return this.http.post(this.constantService.API_ENDPOINT + 'test', body, {
    headers: headers
  })
    .map((data: Response) => data.json())
    .catch(this.handleError);
}


 EventPDFUpload(Id:any,files:any) {
  console.log(files)
  
  let headers = new Headers();
 // headers.append('Content-Type', 'multipart/form-data');
  // headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('token');
  let ClientId = localStorage.getItem("id")
  headers.append('Authorization', authToken);
  let options = new RequestOptions({ headers: headers });
  return this.http.put(this.constantService.API_ENDPOINT + 'events/upload/'+Id, files, {
    
    headers: headers
  })
  //.map((data: Response) => data.json())
    //.catch(this.handleError)
}


  //Delete Category By Id

  deleteCategoryData(Id: any) {
    const headers = new Headers();
    let authToken = localStorage.getItem('token');
    let clientId = localStorage.getItem('id')
    headers.append('Authorization', authToken);
    return this.http.delete(this.constantService.API_ENDPOINT + 'events/delete/'+ Id, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError)
  }


  deleteEventDate(Id: any) {
    const headers = new Headers();
    let authToken = localStorage.getItem('token');
    let clientId = localStorage.getItem('id')
    headers.append('Authorization', authToken);
    return this.http.delete(this.constantService.API_ENDPOINT + 'dates/delete/'+ Id, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError)
  }

  private handleError(error: any) {
    return Observable.throw(error.json());

  }



  sampleTestReport(id:any,files:any) {
    console.log(files)
    
    let headers = new Headers();
   // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.constantService.API_ENDPOINT + 'test/upload/'+id, files, {
      headers: headers
    })
      .map(data => data)
      //.catch(this.handleError)
  }

}
