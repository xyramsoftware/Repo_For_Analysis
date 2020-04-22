import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  API_ENDPOINT: String;
  Auth: string;
  JAVA_BASE_URL: string;
  OAUTH2_REDIRECT_URI: string;
  GOOGLE_AUTH_URL: string;
  FACEBOOK_AUTH_URL: string;

  constructor() {
    // this.API_ENDPOINT = 'http://localhost:3000/api/';
    // this.Auth='http://localhost:3000/auth/'

    // this.API_ENDPOINT = 'http://3.208.86.205:8000/api/';
    // this.Auth='http://3.208.86.205:8000/auth/'

    // this.API_ENDPOINT = 'http://54.87.206.253:8000/api/';
    // this.Auth='http://54.87.206.253:8000/auth/'

    this.API_ENDPOINT = 'https://creorts.com:444/api/';
    this.Auth='https://creorts.com:444/auth/'

    // this.API_ENDPOINT = 'http://13.232.134.15:8000/api/';
    // this.Auth='http://13.232.134.15:8000/auth/'

    this.JAVA_BASE_URL = 'http://localhost:8085';
    this.OAUTH2_REDIRECT_URI = 'http://localhost:4200/redirect'
 
    this.GOOGLE_AUTH_URL = this.JAVA_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + this.OAUTH2_REDIRECT_URI;
    this.FACEBOOK_AUTH_URL = this.JAVA_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + this.OAUTH2_REDIRECT_URI;

    
   }
}
  
  