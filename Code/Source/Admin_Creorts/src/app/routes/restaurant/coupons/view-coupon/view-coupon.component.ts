import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CouponsService } from '../coupons.service';

@Component({
  selector: 'app-view-coupon',
  templateUrl: './view-coupon.component.html',
  styleUrls: ['./view-coupon.component.scss'],
  providers: [CouponsService]
})
export class ViewCouponComponent {
  couponDetails: any = {};
  address: any = [];
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public couponService: CouponsService
  ) {
    this.route.params.map(params => params['id']).subscribe(Id => {
      if (Id != null) {
        couponService.getExpenseById(Id).subscribe(response => {
          this.couponDetails = response;
          console.log(this.couponDetails);
          // couponService.getAddressById(response._id).subscribe(res=>{
          // this.address = res;
          //})
        });
      }
    });
  }
}
