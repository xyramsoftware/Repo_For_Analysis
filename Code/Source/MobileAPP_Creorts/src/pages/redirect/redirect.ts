import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RedirectService } from './redirect.service';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the RedirectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redirect',
  templateUrl: 'redirect.html',
})
export class RedirectPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public redirectService: RedirectService,
    public tastController: ToastController) {
    console.log('app base url', window.location.origin + location.pathname);
    let url = window.location.origin + location.pathname;

    console.log('token', this.getParamValue('token'));
    // console.log('launch', this.getParamValue('launch'));

    let authToken = this.getParamValue('token');
    localStorage.setItem('authtoken', authToken);
    if(authToken) {
      this.redirectService.socialAuthentication(authToken).subscribe(data => {
        console.log('succes', data);
       
        if(data && 'email' in data) {
          localStorage.setItem('outhuser', JSON.stringify(data));
          this.getUserDetails(data.email);
        // this.renderImage()
        }
      }, error => {
        this.navCtrl.setRoot("LoginPage");
        this.presentToast('Please retry');
        // this.navCtrl.pop();
      })
    } else {
      this.navCtrl.setRoot("LoginPage");
      this.presentToast('Please retry');
    }


  }

  private renderImage() {
    this.redirectService.getUser()
        .subscribe(user => {
            console.log(user)
            // localStorage.setItem('userdetails', user);
            localStorage.setItem('userdetails', JSON.stringify(user));
            localStorage.setItem('user', user._id);
            this.navCtrl.setRoot("HomePage");
           
        }, error => {
          this.presentToast('Authentication success, Please register');
          localStorage.removeItem('authtoken');
          this.navCtrl.setRoot("RegistrationPage");
        })


}

  presentToast(message) {
    let toast = this.tastController.create({
      message: message,
      duration: 3000,
      // position: 'top'
    });
    toast.present();
  }

  getUserDetails(email) {
    let Obj={
      email:email
    }
    this.redirectService.getUserDetailsByEmail(Obj).subscribe(data => {
      console.log('success', data);
      localStorage.setItem('token', "bearer " + data.token);
      this.renderImage()
      //localStorage.setItem('userdetails', JSON.stringify(data[0]));
      //this.navCtrl.setRoot("HomePage");
    }, error => {
      this.presentToast('Authentication success, Please register');
      localStorage.removeItem('authtoken');
      this.navCtrl.setRoot("RegistrationPage");
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedirectPage');
  }

  getParamValue(variable) {
    if(document.URL.indexOf("?") != -1) {
      let splitURL = document.URL.split("?");
      let splitParams = splitURL[1].split("&");
      for (let i in splitParams) {
        let singleURLParam = splitParams[i].split('=');
        if(singleURLParam[0] == variable) {
          return singleURLParam[1];
        }
      }
    } else {
      return null;
      // this.nav.push(AuthRequestPage);
    }

  }

}
