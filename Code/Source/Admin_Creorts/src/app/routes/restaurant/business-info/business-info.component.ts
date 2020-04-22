import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'toastr-ng2';
import {BusinessInfoService} from './business-info.service';

@Component({
  selector: 'app-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.scss'],
  providers: [BusinessInfoService]
})
export class BusinessInfoComponent {
  public business = {
    email: '',
    description: '',
    address: '',
    facebookLink: '',
    twitterLink: '',
    officeLocation: '',
    phoneNo: '',
    storeName: ''

  };
  public isLoading: boolean = false;
  private isFirstTime: boolean;
  private _id: any;
  public loading:boolean = true;
  constructor(public toastr: ToastrService,
              public businessService: BusinessInfoService) {
    this.getBusinessDetail();
  }

  getBusinessDetail() {
    this.businessService.getBusinessInfoData()
      .subscribe(response => {
        if (response != null) {
          this.isFirstTime = false;
          this._id = response._id;
          this.business.email = response.email;
          this.business.description = response.description;
          this.business.address = response.address;
          this.business.facebookLink = response.facebookUrl;
          this.business.twitterLink = response.twitterUrl;
          this.business.officeLocation = response.officeLocation;
          this.business.phoneNo = response.phoneNumber;
          this.business.storeName = response.storeName;
          this.loading = !(this.loading);
        } else {
          this.isFirstTime = true;
          this.loading = !(this.loading);
        }
      },(error)=>{
       this.loading = !(this.loading);
       this.toastr.error("Somthing is going wrong","Please login again"); 
      })
  }

  onSubmitBusiness(form: NgForm) {
    this.isLoading = !(this.isLoading);
    if (this.isFirstTime == true) {
      this.businessService.addBusinessData(this.business)
        .subscribe(response => {
          this.isLoading = !(this.isLoading);
          this.toastr.success('Your Business details Added!', 'Success!');
        }, (error) => {
          this.isLoading = !(this.isLoading);
          this.toastr.error("Error....");
        })
    } else {
      this.businessService.updateBusinessData(this.business, this._id)
        .subscribe(response => {
          this.isLoading = !(this.isLoading);
          this.toastr.success('Your Business details updated!', 'Success!');
        }, (error) => {
          this.isLoading = !(this.isLoading);
          this.toastr.error("Error....");

        })
    }


  }
}
