import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {WishlistService} from './wishlist.service'
import { RegistrationThirdPage } from '../registration-third/registration-third';

/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
  providers: [WishlistService]
})
export class WishlistPage {
  userid:any
  UserwishList:any[]=[];
  //userid:any
  AppIcon:any
  header:any
 buttonWhite:any

settingdata:any
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private WishlistService: WishlistService, public alertCtrl: AlertController,) {
      // this.settingdata = JSON.parse(localStorage.getItem('headercolor'));
      // this.header = { 'background-color': this.settingdata.headercolor, 'color': 'white' };
      //           this.buttonWhite = { 'color': 'white' };
      // let Image = JSON.parse(localStorage.getItem('headerIcon'));
      // console.log(Image)
      // if(Image !== null){
      //   this.AppIcon = Image[0]
        
      // }else{
      //   this.AppIcon = "assets/img/xyram.png"
       
      // }
       
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
    if(localStorage.getItem('user')){
      this.userid= localStorage.getItem('user')
      this.GetUserWishlist(this.userid)
    }
  }

  GetUserWishlist(userid:any){

    this.WishlistService.GettingwishlistbyUserid(userid).subscribe(data=>{
      this.UserwishList= data
      for(let i=0;i<this.UserwishList.length;i++){
        if(this.UserwishList[i].eventId.startTime != undefined){
          let hour = (this.UserwishList[i].eventId.startTime.split(':'))[0]
          let min = (this.UserwishList[i].eventId.startTime.split(':'))[1]
          let hour1 = +(this.UserwishList[i].eventId.startTime.split(':'))[0]
          let part = +hour > 12 ? 'PM' : 'AM';
          min = (min+'').length == 1 ? `0${min}` : min;
          hour1 = +hour > 12 ? +hour - 12 : +hour;
          console.log("hours",hour1)
          let time2 = `${hour1}:${min} ${part}`
          console.log("///")
          console.log(time2)
          this.UserwishList[i].eventId.startTime = time2  
        }
        if(this.UserwishList[i].eventId.endTime != undefined){
          let hour = (this.UserwishList[i].eventId.endTime.split(':'))[0]
          let min = (this.UserwishList[i].eventId.endTime.split(':'))[1]
          let hour1 = +(this.UserwishList[i].eventId.endTime.split(':'))[0]
          let part = +hour > 12 ? 'PM' : 'AM';
          min = (min+'').length == 1 ? `0${min}` : min;
          hour1 = +hour > 12 ? +hour - 12 : +hour;
          console.log("hours",hour1)
          let time2 = `${hour1}:${min} ${part}`
          console.log("///")
          console.log(time2)
          this.UserwishList[i].eventId.endTime = time2  
        }
      }

      console.log(this.UserwishList)
    })

  }
  wishlist(event:any){
    console.log(event)
    this.presentConfirm(event)
  }

  presentConfirm(event) {
    let alert = this.alertCtrl.create({
      title: 'Remove',
      message: 'Do you want to remove from  wishlist?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          
          }
        },
        {
          text: 'Remove',
          handler: () => {
           this.WishlistService.deletewishlistByUserId(this.userid,event.eventId._id).subscribe(data=>{

             this.GetUserWishlist(this.userid)

           })    
          }
        }
      ]
    });
    alert.present();
  }

}
