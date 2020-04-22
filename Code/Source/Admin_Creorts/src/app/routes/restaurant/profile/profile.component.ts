import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'toastr-ng2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userData: any = {}

  constructor(public router: Router,
              public toastr: ToastrService) {
  }

  onUpadteUser(form: NgForm) {

    //console.log("Users Data : " + JSON.stringify(this.userData));
    this.toastr.success('Successfully!', ' Updated!');
  }

}
