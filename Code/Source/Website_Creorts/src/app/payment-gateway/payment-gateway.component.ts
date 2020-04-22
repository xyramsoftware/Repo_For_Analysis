import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {
  UserDetails: any = [];
  Event: any = {}
  cod: boolean;
  stripe: boolean;
  paypal: boolean;
  totlamount: number = 0;
  public paymentForm: FormGroup
  paymentType: any;
  loading: boolean;

  constructor(private restService: RegistrationService, private router: Router, private fb: FormBuilder) {
    this.Event = JSON.parse(localStorage.getItem('eventObj'));

    this.paymentForm = this.fb.group({
      paymentType: ['', Validators.required]
    });

    console.log(this.Event)
    for (let i = 0; i < this.Event?.paymentEvents.length; i++) {
      this.totlamount = this.totlamount + this.Event.paymentEvents[i].price
      console.log('total ', this.totlamount)
    }
  }

  ngOnInit(): void {
    console.log("inside on init")
  }

  codShow() {
    this.cod = true;
    this.paypal = false;
    this.stripe = false;
    this.paymentForm.controls["paymentType"].setValidators(Validators.required);
    this.paymentForm.controls["paymentType"].updateValueAndValidity();
  }

  paypalCheck() {
    // this.paymentForm.get('paymentType').setErrors({'notCod': true });
    // this.paymentForm.controls['paymentType'].setErrors({'notCod': true });
    this.cod = false;
    this.paypal = true;
    this.stripe = false;
    
    this.paymentForm.controls["paymentType"].setValidators(Validators.minLength(100));
    this.paymentForm.controls["paymentType"].updateValueAndValidity();
  }

  stripeCheck() {
    this.cod = false;
    this.paypal = false;
    this.stripe = true;
    this.paymentForm.controls["paymentType"].setValidators(Validators.minLength(100));
    this.paymentForm.controls["paymentType"].updateValueAndValidity();
  }

  register() {
    this.loading = true;
    this.restService.createUser(this.Event).subscribe(data => {
      //this.loader1.dismiss()
      console.log(data)
      this.loading = false
      this.router.navigate(['thank-you']);

    })
  }
  update() {
    console.log(this.Event)
    this.restService.updateUser(this.UserDetails._id, this.Event).subscribe(data => {
      console.log(data);
      localStorage.setItem('userdetails', JSON.stringify(data));
      this.router.navigate(['update-succes']);
    })

  }
  islogin() {
    if (localStorage.getItem('webtoken') != null || localStorage.getItem('oauth-token')) {
      this.UserDetails = JSON.parse(localStorage.getItem('userdetails'));
      // console.log(this.userDetails)
      return true;
    }
    return false;
  }
}
