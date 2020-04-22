import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ConstantService } from '../../../constant.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CouponsService {
  constructor(public http: Http, public constantService: ConstantService) { }

  //Geting Coupons Data
  getCouponsData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get(this.constantService.API_ENDPOINT + 'coupons', {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }
  getExpenseById(expenseid: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http
      .get(this.constantService.API_ENDPOINT + 'expense/byId/' + expenseid, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  //get Category List
  getCategoryData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http
      .get(this.constantService.API_ENDPOINT + 'categories', {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  //get Category test  List
  getCategoryTestData(CategoryName) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http
      .get(this.constantService.API_ENDPOINT + 'test/by/categoryCode?search=' + CategoryName, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }


  //Add New Coupon
  addExpenseData(coupon: any) {
    const body = JSON.stringify(coupon);
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientId = localStorage.getItem("id")
    headers.append('Authorization', authToken);
    return this.http
      .post(this.constantService.API_ENDPOINT + 'expense/create', body, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  //Delete Coupons Bt Id
  deleteCouponById(couponId: any) {
    const headers = new Headers();
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http
      .delete(this.constantService.API_ENDPOINT + 'expense/delete/' + couponId, {
        headers: headers
      })
      .map((data: Response) => data)
      .catch(this.handleError);
  }



  updateexpenseById(data, couponId: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    headers.append('Authorization', authToken);
    return this.http
      .put(this.constantService.API_ENDPOINT + 'expense/update/' + couponId, body, {
        headers: headers
      })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }



  //////////////////////////////////////////////////////////////////
  getFormFiledsData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientId = localStorage.getItem('admin_id')
    headers.append('Authorization', authToken);
    return this.http.get(this.constantService.API_ENDPOINT + 'expense/all/', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  deleteExpenseById(expenseId: any) {
    const headers = new Headers();
    let authToken = localStorage.getItem('admintoken');
    let ClientId = localStorage.getItem('admin_id')
    headers.append('Authorization', authToken);
    return this.http.delete(this.constantService.API_ENDPOINT + 'expense/delete/' + expenseId, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError)
  }


  // update Carosel data
  UpdateExpenseData(id: any, data: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let clientId = localStorage.getItem("id")
    headers.append('Authorization', authToken);
    return this.http.put(this.constantService.API_ENDPOINT + 'expense/update/' + id, body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  ExpenseImage(Id: any, files: any) {
    console.log(files)

    let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('admintoken');
    let ClientId = localStorage.getItem("id")
    headers.append('Authorization', authToken);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.constantService.API_ENDPOINT + 'expense/upload/' + Id, files, {

      headers: headers
    })
    //.map((data: Response) => data.json())
    //.catch(this.handleError)
  }

  expensereport()
{
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('admintoken');
  headers.append('Authorization', authToken);
  return this.http
    .get(this.constantService.API_ENDPOINT + 'expense/allreports', {
      headers: headers
    })
    .map((data: Response) => data)
    .catch(this.handleError);
}
  private handleError(error: any) {
    return Observable.throw(error.json());
  }
}

