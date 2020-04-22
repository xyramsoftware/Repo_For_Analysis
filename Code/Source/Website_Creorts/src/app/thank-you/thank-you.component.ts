import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router'
@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {
  userDetails: any=[];

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  isLogin() {
    if(localStorage.getItem('webtoken') != null){
      this.userDetails = JSON.parse(localStorage.getItem('userdetails'));
      return true;
    }
    return false;
}
  login(){
    this.router.navigate(['']);

  }

  home(){
    this.router.navigate(['']);
  }

}
