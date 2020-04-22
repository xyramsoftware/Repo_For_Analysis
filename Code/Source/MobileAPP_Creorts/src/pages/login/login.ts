import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, Events, NavParams, IonicPage, LoadingController, Content, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Facebook} from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { LoginService } from './login.service';
import { UserService } from '../../providers/user-service';
import { SocketService } from '../../providers/socket-service';
import { ConstService } from "../../providers/const-service";
import { HeaderColor } from '@ionic-native/header-color/ngx';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser';


// Author : Sridhar

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [Facebook, GooglePlus, TwitterConnect, LoginService,InAppBrowser]
})
export class LoginPage {

    
    
   // API_BASE_URL = 'http://localhost:8085';
    //ACCESS_TOKEN = 'accessToken';
    OAUTH2_REDIRECT_URI = 'http://localhost:8100/redirect'
 
    GOOGLE_AUTH_URL = this.constService.java_base_URL + 'oauth2/authorize/google?redirect_uri=' + this.OAUTH2_REDIRECT_URI;
    FACEBOOK_AUTH_URL = this.constService.java_base_URL + 'oauth2/authorize/facebook?redirect_uri=' + this.OAUTH2_REDIRECT_URI;
    

    @ViewChild(Content) content: Content;
    user: FormGroup;

    toolbar_color: string;
    passworderror: boolean = false
    Usernameerror: boolean = false
    Screens: any = []
    AppSttings: any = []
    AppIcon: any
    myvar: any = "#327eff"
    private currentColor: string
    imageUrl: any
    header: any
    buttonWhite: any
    loginerrermessage: boolean = false
    nubervalidatin: boolean = false

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public fb: FormBuilder,
        private facebook: Facebook,
        public googlePlus: GooglePlus,
        public loadingCtrl: LoadingController,
        public twitter: TwitterConnect,
        public platform: Platform,
        private lab: InAppBrowser,
        private headerColor: HeaderColor,
        public constService: ConstService,
        public loginService: LoginService,
        public userService: UserService,
        public ref: ChangeDetectorRef,
        public socketService: SocketService) {
        this.imageUrl = localStorage.getItem('userImage');
        console.log(this.imageUrl)
        if (this.imageUrl == null) {
            this.imageUrl = "assets/img/profile2.jpg"
        } else {

        }
        this.AppIcon = "assets/img/xyram.png"
        // this.getscreendata()
        //this.getAppSettings()
        this.toolbar_color = "secondary";
        this.currentColor = '#327eff';
        //this.headerColor.tint("#2ecc71")
    }

    //   Usage : this Method is to use  for getting sceens list 

    changeColor() {
        this.toolbar_color = "primary";
        console.log(this.toolbar_color)
        this.ref.detectChanges();
    }

    ionViewDidLoad() {
//         const browser = this.iab.create('https://ionicframework.com/');

// //browser.executeScript(...);

// //browser.insertCSS(...);
// browser.on('loadstop').subscribe(event => {
//    browser.insertCSS({ code: "body{color: red;" });
// });

// browser.close();
        this.changeColor();
        //this.content.enableJsScroll();
        // this.content.ionScrollEnd.subscribe(() => {
        //     this.changeColor();
        // });
    }
    getscreendata() {

        this.loginService.GetingScreens().subscribe(data => {
            for (let i = 0; i < data.length; i++) {
                this.Screens.push(data[i].screenTitle)
            }

            localStorage.setItem('Screens', this.Screens);
        })
    }

    getAppSettings() {
        this.loginService.GetAppSettings().subscribe(data => {
            console.log(data)
            this.AppSttings = data
            if (this.AppSttings.length == 1) {
                this.header = { 'background-color': this.AppSttings[0].headercolor, 'color': 'white' };
                this.buttonWhite = { 'color': 'white' };
                localStorage.setItem('headercolor', JSON.stringify(this.AppSttings[0]));
                this.AppIcon = this.constService.base_url + "api/appsettings/appicon/" + this.AppSttings[0]._id + '?clientID=' + this.constService.clientId + '&id=' + this.AppSttings[0]._id + '&appicon=' + this.AppSttings[0].appicon
                localStorage.setItem('headerIcon', JSON.stringify([this.AppIcon]));
            }

        })
    }

    //   Usage : this Method is to use  for User login
    onLogin() {
        this.loginerrermessage = false
        let loader = this.loadingCtrl.create({
            content: 'please wait'
        })
        loader.present();
        this.passworderror = false
        this.Usernameerror = false
        this.user.value.phone = 91+this.user.value.phone
        this.loginService.login(this.user.value)
            .subscribe(user => {
                console.log(user)
                if (user.message == "This password is not correct.") {
                    loader.dismiss();
                    this.passworderror = true

                } else if (user.message == "This Username is not registered.") {
                    loader.dismiss();
                    this.Usernameerror = true
                } else {
                    loader.dismiss();
                    localStorage.setItem('token', "bearer " + user.token);
                    if (this.navParams.get("flag") == 0) {
                        this.navCtrl.setRoot("CartPage");
                    } else {
                        this.navCtrl.setRoot("HomePage");
                        this.Usernameerror = false
                        this.passworderror = false
                        this.socketService.establishConnection();
                        this.renderImage();
                    }
                }

            }, error => {
                loader.dismiss();
                this.loginerrermessage = true
            })
    }

    ngOnInit(): any {
        let pattern1 = "^[0-9_-]{10,12}";
        this.user = this.fb.group({
            phone: ['', Validators.pattern(pattern1)],
            // password: ['', Validators.required],

        });
    }

    NumberValidation(value: any) {
        //  console.log(value.length)
        if (value.length <= 9) {
            this.nubervalidatin = true
        } else {
            this.nubervalidatin = false
        }

    }

    private renderImage() {
        this.userService.getUser()
            .subscribe(user => {
                console.log(user)
                // localStorage.setItem('userdetails', user);
                localStorage.setItem('userdetails', JSON.stringify(user));
                localStorage.setItem('user', user._id);
                if (user.profileImg !== undefined) {
                    this.imageUrl = this.constService.base_url + "api/users/profileImg/" + user._id + "?clientID=" + this.constService.clientId + "&RegisterId=" + user.RegisterId + "&profileImg=" + user.profileImg
                } else {
                    this.imageUrl = "assets/img/profile2.jpg"
                }
                console.log(this.imageUrl)
                localStorage.setItem('userImage', this.imageUrl);
                this.events.publish('imageUrl', this.imageUrl);
            })


    }


    fblogin(){
       let url  = this.FACEBOOK_AUTH_URL
       // window.open(this.FACEBOOK_AUTH_URL)
         const options:  InAppBrowserOptions ={
          zoom:'no'
        }
     const browser = this.lab.create(url,'_self',options)
     //browser.on('').subscribe
    }

    googlelogin(){
        console.log("jsdklas")
      //  window.open(this.GOOGLE_AUTH_URL)
     let url  = this.GOOGLE_AUTH_URL
        // window.open(this.FACEBOOK_AUTH_URL)
          const options:  InAppBrowserOptions ={
           zoom:'no'
         }
      const browser = this.lab.create(url,'_self',options)
    }


    //   Usage : this Method is to use  for User FB Login 

    doFbLogin() {
        this.facebook.logout()
        let permissions = new Array();
        permissions = ["public_profile", "email"];
       
        this.facebook.login(permissions)
            .then((success) => {
                this.facebook.api("/me?fields=id,name,email,gender,first_name,last_name", permissions).then((user) => {
                    //here post data to Api
                     console.log(user)
                    localStorage.setItem('user', user.id);
                    this.navCtrl.setRoot("RegistrationPage");
                }),
                    (error) => {
                        console.log(JSON.stringify(error));
                        console.log('FAcebook not responding!');

                    }

            }, error => {
                console.log("FaceBook ERROR : ", JSON.stringify(error));
            })
    }


    //   Usage : this Method is to use  for User Google Login 

    DogoogleLogin() {
        this.googlePlus.login({
            'scopes': '',
            'webClientId': '1072102997404-elirumiap5shkvc4dbu7dul6v73h8bs0.apps.googleusercontent.com',
            'offline': true
        })
            .then((success) => {
                console.log("you have been successfully logged in by googlePlus!" + JSON.stringify(success));
                //here post data to Api
                localStorage.setItem('user', success.userId);
                this.navCtrl.setRoot("RegistrationPage");
            },
                (error) => {
                    console.log('error' + JSON.stringify(error));

                })
    }


    //   Usage : this Method is to use  for User Twitter Login 

    twitterLogin() {
        this.platform.ready().then((res) => {
            if (res == 'cordova') {
                this.twitter.login().then((result) => {
                    this.twitter.showUser().then((user) => {
                        console.log("user" + JSON.stringify(user));
                        //here post data to Api
                        localStorage.setItem('user', user.id);
                        this.navCtrl.setRoot("RegistrationPage");
                    },
                        (onError) => {
                            console.log("user" + JSON.stringify(onError));
                        })
                })
            }
        })
    }

    //   Usage : this Method is used  for navigation to registration page

    Register() {

        this.navCtrl.setRoot("RegistrationPage");
    }
}
