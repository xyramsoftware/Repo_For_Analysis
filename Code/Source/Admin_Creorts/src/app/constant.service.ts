import {Injectable} from '@angular/core';

@Injectable()
export class ConstantService {

  API_ENDPOINT: String;
  Login_Auth: String;
  Socket_Url: String;

  constructor() {
   
      //  this.Socket_Url ='http://localhost:3000/';
      //  this.Login_Auth = 'http://localhost:3000/';
      //  this.API_ENDPOINT = 'http://localhost:3000/api/';

      //  this.Socket_Url ='http://54.173.80.197:9091/';
      //  this.Login_Auth = 'http://54.173.80.197:9091/';
      //  this.API_ENDPOINT = 'http://54.173.80.197:9091/api/';

      //  this.Socket_Url ='http://13.232.134.15:8000/';
      //  this.Login_Auth = 'http://13.232.134.15:8000/';
      //  this.API_ENDPOINT = 'http://13.232.134.15:8000/api/';

       this.Socket_Url ='https://creorts.com:444/';
       this.Login_Auth = 'https://creorts.com:444/';
       this.API_ENDPOINT = 'https://creorts.com:444/api/';

      //  this.Socket_Url ='http://3.208.86.205:8000/';
      //  this.Login_Auth = 'http://3.208.86.205:8000/';
      //  this.API_ENDPOINT = 'http://3.208.86.205:8000/api/';


      // this.Socket_Url ='http://54.87.206.253:8000/';
      // this.Login_Auth = 'http://54.87.206.253:8000/';
      // this.API_ENDPOINT = 'http://54.87.206.253:8000/api/';

      
   
  } 
}
