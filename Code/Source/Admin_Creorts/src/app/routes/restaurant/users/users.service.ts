import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';

@Injectable()

export class UsersService {

  constructor(public http: Http, public constantService: ConstantService) {
  }

  //Get All Users
  getUsersData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientId = localStorage.getItem('admin_id')
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'users/all/', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  //Get User By Id
  getUserById(userId: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientId = localStorage.getItem('admin_id')
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'users/byId/'+userId, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

   //Get Address of User By Id
  getAddressById(userId: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'addresses/user/' + userId, {
      headers: headers
    })
      .map((data: Response) => data.json())
      //.catch(this.handleError)
  }

   //Get Address of User By Id
   getAccompanyByUserId(userId: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
   let authToken = localStorage.getItem('admintoken');
   headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'accompanies/fordash/' + userId, {
      headers: headers
    })
      .map((data: Response) => data.json())
      //.catch(this.handleError)
  }

  //Add New User
  addUserData(data: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http.post(this.constantService.API_ENDPOINT + 'users', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  //Delete User By Id
  deleteUserById(userId: any) {
    const headers = new Headers();
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http.delete(this.constantService.API_ENDPOINT + 'users/' + userId, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError)
  }


  private handleError(error: any) {
    return Observable.throw(error.json());
  }



 //Add New User
//  UpdateUserData(userid:any) {
//   const body = JSON.stringify(data);
//   console.log(body)
//   const headers = new Headers();
//   headers.append('Content-Type', 'application/json');
//   let authToken = localStorage.getItem('admintoken');
//   headers.append('Authorization', authToken);
//   return this.http.put(this.constantService.API_ENDPOINT + 'users/',+ userid,{
//     headers: headers
//   })
//     .map((data: Response) => data.json())
//     .catch(this.handleError)
// }

  //Update Menu By Id
  UpdateUserData(data: any, userId: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'users/' + userId, body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }


}
