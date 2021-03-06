import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {LoginService} from "./login.service";

@Injectable()
export class AuthService implements CanActivate {

  constructor(private loginService: LoginService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  checkLogin() {

    if (localStorage.getItem('admintoken') != null) {
      return true;
    } else {
      return false;
    }

  }

}
