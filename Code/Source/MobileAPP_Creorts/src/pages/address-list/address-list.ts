import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { AddressListService } from './address-list.service';

@IonicPage()
@Component({
  selector: 'page-address-list',
  templateUrl: 'address-list.html',
  providers:[AddressListService]
})
export class AddressListPage {
       addressList:any[];
       grandTotal:number;
       orderData:any={ };
       showAddress: boolean = false;
       selectedAddress:any={};
       header_data:any;
      public amountDetails:any={};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl:LoadingController,
              public alertCtrl:AlertController,
              private addressListService:AddressListService) {
    
              this.amountDetails=this.navParams.get('amountDetails');
              this.orderData.grandTotal=this.amountDetails.grandTotal;
              this.orderData.subTotal=this.amountDetails.subTotal;
              this.orderData.taxAmount=this.amountDetails.tax;
              this.orderData.couponDiscountPercentage=this.amountDetails.couponDiscount;
              this.orderData.deductedAmountByCoupon=this.amountDetails.deductedPrice;
              this.orderData.cart=JSON.parse(localStorage.getItem("cartItem"));
              this.header_data = {ismenu: false , isHome:false, isCart: true,isSearch:false, title: 'Delivery Options'};
  }

  ngOnInit() {
    let loader =this.loadingCtrl.create({
      content:'please wait'
    })
    loader.present();
    this.addressListService.getAddressList()
    .subscribe(response=>{
      this.addressList=response;
      loader.dismiss();
    },(error)=>{
      loader.dismiss();
    });
    this.orderData.status='pending';
  }



   addAddress(){
    this.navCtrl.push("AddressPage",
      { amountDetails:this.amountDetails });
  }

 
  selectAddress(address){;
    this.orderData.shippingAddress=address;
    delete this.orderData.shippingAddress['_id'];
    this.selectedAddress=address;
  }

  checkOut(){
    if(this.orderData.shippingAddress!=null){
    this.navCtrl.push("CheckoutPage",{
        orderData:this.orderData
    });
    }
    else {
     this.showAlert();
    }
   
  }

    showAlert() {
    let alert = this.alertCtrl.create({
      subTitle: 'Please select address.',
      buttons: ['OK']
    });
    alert.present();
  }

}
