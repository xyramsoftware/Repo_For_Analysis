import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ProfileService } from './profile.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  UserDetails: any = {}
  TeamDetails: any = {}
  teamList: any = [];
  AccompanyDetails: any = {};
  accompany: any;
  team: any;
  isTeamClicked: boolean = false;
  isAccompanyClicked: boolean = false;
  str: string;

  constructor(public router: Router, public restService: ProfileService, private viewportScroller: ViewportScroller) {
    this.getLatestUserData();
    this.UserDetails = JSON.parse(localStorage.getItem('userdetails'));

    this.personlist();
    console.log(this.UserDetails);
    console.log(this.UserDetails.name);
    console.log(this.AccompanyDetails);
    this.getTeamData();
    console.log("Team Data ", JSON.stringify(this.teamList));
  }

  ngOnInit(): void {

    this.UserDetails = JSON.parse(localStorage.getItem('userdetails'));
  }

  getLatestUserData(){
    this.restService.getLatestUserData().subscribe(data=>{
      console.log(data);
      localStorage.setItem('userdetails', JSON.stringify(data));
    });
  }

  getTeamData() {
    console.log("inside getTeamData");
    for (let i = 0; i < this.UserDetails.teamReg.length; i++) {
      this.teamList.push(this.UserDetails.teamReg[i]);

    }
    console.log("team data :",this.teamList);
  }

  displayteamlist(event) {
    console.log(event)
    console.log(this.UserDetails)
    this.teamList = []
    for (let i = 0; i < this.UserDetails.AllTeamImages.length; i++) {
      if (event._id == this.UserDetails.AllTeamImages[i].EventID) {
        this.teamList.push(this.UserDetails.AllTeamImages[i])
      }
    }
    localStorage.setItem('teamlist', JSON.stringify(this.teamList));
    //console.log(this.teamList)
    this.router.navigate(['teamdetails'])
  }

  personlist() {
    this.restService.accompanyList(this.UserDetails._id).subscribe(data => {
      console.log(data);
      this.AccompanyDetails = data;
    })
  }

  displayTeam(team: any, id:any){
    this.isTeamClicked = true;
    this.isAccompanyClicked = false;
    this.team = team;
    this.team._id = id;
    console.log(this.team);

    for(let event of this.UserDetails.AllTeamImages){
      if(event.EventID == this.team._id){
        for(let member of this.team.teamMembers){
          if(member.name == event.Name){
              member.url = event.URL;
          }
        }
      }
    }
    console.log("After adding Images ", this.team);

    this.viewportScroller.scrollToAnchor('team-section');
  }

  displayAccompany(accompany:any){

    this.isAccompanyClicked = true;
    this.isTeamClicked = false;
    this.accompany = accompany;
    console.log(this.accompany);
    this.viewportScroller.scrollToAnchor('acc-section');
  }

  hideThis(){
    this.isAccompanyClicked = false;
    this.isTeamClicked = false;
  }
}
