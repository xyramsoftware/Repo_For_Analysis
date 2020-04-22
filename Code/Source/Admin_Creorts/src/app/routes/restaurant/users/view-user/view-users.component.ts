import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from '../users.service';
import { ToastrService } from 'toastr-ng2';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
  providers: [UsersService]
})
export class ViewUserComponent implements OnInit {
  UserDetails: any = []
  TeamDetails: any = {}
  teamList: any = [];
  AccompanyList: any = [];
  accompany: any=[]
  accompanyDetails:any=[]
  team: any;
  UserId: any
  teamURL: any = []
  isTeamClicked: boolean = false;
  isAccompanyClicked: boolean = false;
  NoTeamdata:boolean;
  NoAccompany:boolean
  payment: any = []
  constructor(private route: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService,
    public userService: UsersService) {
    this.route.params.map(params => params['id']).subscribe(Id => {
      if (Id != null) {
        this.UserId = Id;
        this.getuserDetailById(Id); //function call to get userDetails by id
        this.getAccompanyList(Id);//function call to get accompany details by user id
        console.log(Id);
        localStorage.setItem('UserId', JSON.stringify(Id))
      }
    });
  }


  ngOnInit(): void {

  }

  getuserDetailById(Id) {
    this.userService.getUserById(Id).subscribe(response => {
      this.UserDetails = response
      console.log(this.UserDetails)
    })
  }

  getAccompanyList(Id) {
    this.userService.getAccompanyByUserId(Id).subscribe(response => {
      this.AccompanyList = response
      console.log(this.AccompanyList)
    })

  }





  displayTeam(teamid: any) {
    this.isAccompanyClicked = false;
    this.isTeamClicked = true;
    localStorage.removeItem('accompany');
    console.log(teamid)
    // this.teamList = []
    for (let i = 0; i < this.UserDetails.AllTeamImages.length; i++) {

      if (teamid == this.UserDetails.AllTeamImages[i].EventID)
      {
        this.teamList.push(this.UserDetails.AllTeamImages[i])
      }
      localStorage.setItem('team', JSON.stringify(this.teamList));
    }
  

    for (let i = 0; i < this.UserDetails.teamReg.length; i++) {
      if (teamid == this.UserDetails.teamReg[i]._id) {
        this.teamURL = this.UserDetails.teamReg[i]
      }

      localStorage.setItem('url', JSON.stringify(this.teamURL));

    }

    console.log(this.teamList)
    console.log(this.teamURL)
    // this.isTeamClicked = true;
    // this.isAccompanyClicked = false;
    this.router.navigate(['/users/addUser']);

  }

  displayAccompany(id:any) {
    localStorage.removeItem('team');
    localStorage.removeItem('url');
    this.isAccompanyClicked = true;
    this.isTeamClicked = false;
    console.log(this.AccompanyList,id);
    for(let i=0;i<this.AccompanyList.length;i++)
    {
      if(id==this.AccompanyList[i]._id)
      {
        
        this.accompanyDetails=this.AccompanyList[i];
      }
    }
    //this.accompany = accompany;
    console.log(this.accompanyDetails);
    localStorage.setItem('accompany', JSON.stringify(this.accompanyDetails));
    this.router.navigate(['/users/addUser']);

  }

  // hideThis() {
  // this.isAccompanyClicked = false;
  //   this.isTeamClicked = false;
  // }

}
