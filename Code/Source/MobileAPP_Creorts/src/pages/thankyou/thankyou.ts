import {Component} from '@angular/core';
import {NavController,IonicPage,NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-thankyou',
    templateUrl: 'thankyou.html'
})
export class ThankyouPage {
    type:any
    AppIcon:any
    header:any
    buttonWhite:any
    settingdata:any
    constructor(public navCtrl: NavController, public navparam:NavParams) {
         this.type = this.navparam.data.type
        
        //  this.settingdata = JSON.parse(localStorage.getItem('headercolor'));
        //  this.header = { 'background-color': this.settingdata.headercolor, 'color': 'white' };
        //  this.buttonWhite = { 'color': 'white' };
        //  let Image = JSON.parse(localStorage.getItem('headerIcon'));
        //  console.log(Image)
        //  if(Image !== null){
        //    this.AppIcon = Image[0]
           
        //  }else{
        //    this.AppIcon = "assets/img/xyram.png"
          
        //  }
    }

    ionViewDidLoad() {
      
    }

   home(){
    this.navCtrl.setRoot("HomePage");
   }
}
