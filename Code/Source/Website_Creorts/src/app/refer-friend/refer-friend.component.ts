import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { ReferfriendService } from './referfriend.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-refer-friend',
  templateUrl: './refer-friend.component.html',
  styleUrls: ['./refer-friend.component.css']
})
export class ReferFriendComponent implements OnInit {
  referFriend: FormGroup
  UserDetails: any = [];
  Obj: any = [];
  loading: boolean;
  friendDetails: any = [];
  constructor(private fb: FormBuilder, private restService: ReferfriendService, public router: Router) {
    this.referFriend = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9_-]{10}')]]
    })
    this.UserDetails = JSON.parse(localStorage.getItem('userdetails'));
    this.friendList();
    console.log(this.friendDetails);
  }

  ngOnInit(): void {
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  send() {
    if (!this.loading) {
      console.log(this.referFriend.value)
      this.loading = true;
      // this.referFriend.value.phone = '91'+this.referFriend.value.phone
      let Obj = {
        name: this.referFriend.value.name,
        phone: '91' + this.referFriend.value.phone,
        userID: this.UserDetails._id
      }
      // this.Obj = this. referFriend.value
      // this.Obj=this.UserDetails._id;
      this.restService.referFriend(Obj, this.UserDetails._id).subscribe(data => {
        console.log(data);
        this.router.navigate(['refer-friend']);
        this.referFriend.reset();
        this.loading = false;
        this.friendList();

      })
    }
  }
  friendList() {
    this.restService.friendsList(this.UserDetails._id).subscribe(data => {
      console.log(data);
      this.friendDetails = data;
    })
  }

}
