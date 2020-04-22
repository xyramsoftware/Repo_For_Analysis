import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {ConstantService} from '../../../constant.service';

@Injectable()

export class ReportsService {
  disabledAgreement: boolean = true;
  disabledQR: boolean = true;
  changeCheck(event){
    this.disabledAgreement = !event.arget.checked;
  }
  change(event){
    this.disabledQR = !event.target.checked;
  }
  constructor(public http: Http, public constantService: ConstantService) {
  }

 
//Get todays Orders
getEventsList()
{
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('admintoken');
  headers.append('Authorization', authToken);
  return this.http
    .get(this.constantService.API_ENDPOINT + 'events/all', {
      headers: headers
    })
    .map((data: Response) => data.json())
    .catch(this.handleError);
}

getSportsIndividualList(categoryId:any,EventId:any)
{
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('admintoken');
  headers.append('Authorization', authToken);
  return this.http
    .get(this.constantService.API_ENDPOINT + 'events/bytype/'+categoryId+'/'+EventId, {
      headers: headers
    })
    .map((data: Response) => data.json())
    .catch(this.handleError);
}
getSportsTeamList(categoryId:any,EventId:any)
{
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('admintoken');
  headers.append('Authorization', authToken);
  return this.http
    .get(this.constantService.API_ENDPOINT + 'events/bytype/'+categoryId+'/'+EventId, {
      headers: headers
    })
    .map((data: Response) => data.json())
    .catch(this.handleError);
}
getCulturalList(categoryId:any,EventId:any)
{
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('admintoken');
  headers.append('Authorization', authToken);
  return this.http
    .get(this.constantService.API_ENDPOINT + 'events/bytype/'+categoryId+'/'+EventId, {
      headers: headers
    })
    .map((data: Response) => data.json())
    .catch(this.handleError);
}

getSportIndividualReport(gender:any,event:any,min:any,max:any)
{
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('admintoken');
  headers.append('Authorization', authToken);
  return this.http
    .get(this.constantService.API_ENDPOINT + 'users/individual/'+event+'/'+gender+'?gte='+min+'&lte='+max, {
      headers: headers
    })
    .map((data: Response) => data)
    .catch(this.handleError);
}

getSportTeamReport(gender:any,event:any,min:any,max:any)
{
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('admintoken');
  headers.append('Authorization', authToken);
  return this.http
    .get(this.constantService.API_ENDPOINT + 'users/team/'+event+'/'+gender+'?gte='+min+'&lte='+max, {
      headers: headers
    })
    .map((data: Response) => data)
    .catch(this.handleError);
}

getCulturalReport(gender:any,event:any,min:any,max:any)
{
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('admintoken');
  headers.append('Authorization', authToken);
  return this.http
    .get(this.constantService.API_ENDPOINT + 'users/cultural/'+event+'/'+gender+'?gte='+min+'&lte='+max, {
      headers: headers
    })
    .map((data: Response) => data)
    .catch(this.handleError);
}
getAllReport()
{
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('admintoken');
  headers.append('Authorization', authToken);
  return this.http
    .get(this.constantService.API_ENDPOINT + 'users/allreports', {
      headers: headers
    })
    .map((data: Response) => data)
    .catch(this.handleError);
}
  private handleError(error: any) {
    return Observable.throw(error.json());
  }
  getAccompanyReport()
{
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('admintoken');
  headers.append('Authorization', authToken);
  return this.http
    .get(this.constantService.API_ENDPOINT + 'accompanies/allreports', {
      headers: headers
    })
    .map((data: Response) => data)
    .catch(this.handleError);
}
getSportIndividualQRReport(gender:any,event:any,min:any,max:any){
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('admintoken');
  headers.append('Authorization', authToken);
  return this.http
    .get(this.constantService.API_ENDPOINT + 'users/QRindividual/'+event+'/'+gender+'?gte='+min+'&lte='+max, {
      headers: headers
    })
    .map((data: Response) => data)
    .catch(this.handleError);
}
getTeamQRReport(gender:any,event:any,min:any,max:any){
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('admintoken');
  headers.append('Authorization', authToken);
  return this.http
    .get(this.constantService.API_ENDPOINT + 'users/QRteam/'+event+'/'+gender+'?gte='+min+'&lte='+max, {
      headers: headers
    })
    .map((data: Response) => data)
    .catch(this.handleError);
}
getCulturalQRReport(gender:any,event:any,min:any,max:any){
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('admintoken');
  headers.append('Authorization', authToken);
  return this.http
    .get(this.constantService.API_ENDPOINT + 'users/QRcultural/'+event+'/'+gender+'?gte='+min+'&lte='+max, {
      headers: headers
    })
    .map((data: Response) => data)
    .catch(this.handleError);
}
getAccompanyQRReport(){
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('admintoken');
  headers.append('Authorization', authToken);
  return this.http
    .get(this.constantService.API_ENDPOINT + 'accompanies/checkedIn', {
      headers: headers
    })
    .map((data: Response) => data)
    .catch(this.handleError);
}

}



