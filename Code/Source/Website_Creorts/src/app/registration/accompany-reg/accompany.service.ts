import { Injectable } from '@angular/core';
import { ConfigService } from '../../config.service';
import { Http, Response, Headers } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class AccompanyService {

  constructor(private http: Http, public configService: ConfigService) { }

  createaccompany(Obj: any, Id: any) {
    const headers = new Headers();
    let authtoken = localStorage.getItem('webtoken');
    headers.append('Authorization', authtoken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.configService.API_ENDPOINT + 'accompanies/create/' + Id, Obj, {
      headers: headers
    })
      .map((data: Response) => data.json() || {})
  }

  getAllEvents(): Observable<any> {
    return this.http.get(this.configService.API_ENDPOINT + 'events/all').map(data => data.json());
  }

}
