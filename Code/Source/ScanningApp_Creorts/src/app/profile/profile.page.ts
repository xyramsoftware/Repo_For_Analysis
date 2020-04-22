import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  PersonDetails:any={}
  constructor() { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.PersonDetails = JSON.parse(localStorage.getItem('LoginDetails'));
    console.log(this.PersonDetails)
  }

}
