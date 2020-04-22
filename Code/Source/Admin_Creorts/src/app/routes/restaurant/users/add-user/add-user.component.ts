import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { ToastrService } from 'toastr-ng2';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [UsersService]
})
export class AddUserComponent {
  public userDetails: any = {};
  public isLoading: boolean = false;
  id: any
  accompany: any = []
  team: any = []
  public divteam: boolean = false;
  public divaccompany: boolean = false;
  teamURL: any=[]
  headerTitle: any
  UserId:any;
  constructor(private route: ActivatedRoute,
    public router: Router,
    public usersService: UsersService,
    public toster: ToastrService) {
    this.accompany = JSON.parse(localStorage.getItem('accompany'));
    this.team = JSON.parse(localStorage.getItem('team'));
    this.teamURL = JSON.parse(localStorage.getItem('url'));
    this.UserId=JSON.parse(localStorage.getItem('UserId'));
    console.log(this.team);
    console.log(this.accompany);
    console.log(this.UserId);
    if (this.accompany != null) {
      localStorage.removeItem('team');
      localStorage.removeItem('url');
      this.divteam = false;
      this.divaccompany = true;
      this.headerTitle = 'Accompany Details'
    }
    else{
      this.divaccompany = false;
    }
    if (this.team != null) {
      localStorage.removeItem('accompany');
      this.divteam = true;
      this.divaccompany = false;
      this.headerTitle = 'Team Details'

    }
    else{
      this.divteam = false;
     
    }
  }


  onAddUsers(form: NgForm) {
    this.isLoading = !(this.isLoading);
    this.usersService.addUserData(this.userDetails)
      .subscribe(response => {
        this.toster.success('User Created Successfully!', 'Success!');
        this.isLoading = !(this.isLoading);
        this.router.navigate(['/users/manageUsers'])
      }, (error) => {
        this.isLoading = !(this.isLoading);
        this.toster.error("Error....");
        this.router.navigate(['/users/manageUsers'])
      })
  }


  cancel() {
    this.router.navigate(['/users/manageUsers'])
  }

}
