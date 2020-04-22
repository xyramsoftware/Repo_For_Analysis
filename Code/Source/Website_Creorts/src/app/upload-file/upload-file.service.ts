import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private https: HttpClient) { }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {

    let params = new HttpParams();
    let headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.set('Accept', "multipart/form-data");

    const data: FormData = new FormData();
    data.append('file', file);
    data.append("request", "Import test message")
    const newRequest = new HttpRequest('POST', 'http://localhost:8085/api/admin/upload', data, { params, headers });
    return this.https.request(newRequest);
  }
}