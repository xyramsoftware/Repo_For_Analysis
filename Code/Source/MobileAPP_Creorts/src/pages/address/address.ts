import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AddressService } from './address.service';

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
  providers:[AddressService]
})

export class AddressPage {
      address={
        userName:'',
        homeNumber:'',
        apartmentName:'',
        mobileNo:'',
        landmark:'',
        city:'',
        state:'',
        pincode:''
      };
      addressId:'';
      orderData:any;
      selectedAddress:any;
      eventdata:any={}
      teamdata:any=[]
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl:LoadingController,
              public addressService:AddressService) {

             this.eventdata=this.navParams.data
             console.log(this.eventdata)
             this.teamdata = this.eventdata.teamdata
             console.log(this.teamdata)
             for(let i=0;i<this.teamdata.length;i++){
              this.teamdata[i]['thumb'] = this.teamdata[i].URL
             }

           }

  ngOnInit() {
  
   
  }

  onSubmitAddress(){
    let loader =this.loadingCtrl.create({
      content:'please wait'
    })
    loader.present();
    if(this.navParams.get('selectedAddress')){
      this.addressService.updateAddress(this.selectedAddress._id,this.address)
      .subscribe(response=>{
        loader.dismiss();
         this.navCtrl.push("CheckoutConfirmPage",
           { selectedAddress:response,
             orderData:this.orderData 
           });
      },(error)=>{
        loader.dismiss();
      }) 
    } else {
      this.addressService.addAddress(this.address)
    .subscribe(response=>{
         loader.dismiss();
        this.navCtrl.push("AddressListPage",{
          amountDetails:this.navParams.get('amountDetails')
        });
        
    },(error)=>{
      loader.dismiss();
    })
    }
  }


   confirm() {
   	  this.navCtrl.push("CheckoutConfirmPage");
   }
}
