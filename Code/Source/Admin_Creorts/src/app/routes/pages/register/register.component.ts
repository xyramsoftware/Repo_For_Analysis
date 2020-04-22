import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../../core/settings/settings.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Router} from '@angular/router';
import {ToastrService} from 'toastr-ng2';
import {RegisterService} from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  valForm: FormGroup;
  isLoading: boolean = false;

  constructor(public settings: SettingsService,
              fb: FormBuilder,
              public router: Router,
              public toastr: ToastrService,
              public registerService: RegisterService) {

    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'name': [null],
      'mobileNo': [null],
      'password': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')])]
    });
  }

  submitForm($ev, value: any) {
    console.log("admin register")
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }

     console.log(this.valForm.valid)
    if (!this.valForm.valid) {
      this.isLoading = !this.isLoading;
      this.registerService.registerData(this.valForm.value)
        .subscribe(response => {
          this.toastr.success('Register Successfully!', 'Success!');
          this.router.navigate(['login'])
          this.isLoading = !this.isLoading;
        })
    }
  }

  ngOnInit() {
  }

}
