import {Component, ViewChild} from '@angular/core';
import {Nav, Platform,Events} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Service} from '../app/service';
import {OneSignal} from '@ionic-native/onesignal';
import {SocialSharing} from '@ionic-native/social-sharing';
import {SocketService } from '../providers/socket-service';
import {UserService} from '../providers/user-service';
import {TranslateService} from 'ng2-translate';
import {ConstService} from "../providers/const-service";



@Component({
    templateUrl: 'app.html',
    selector: 'MyApp',
    providers: [Service, OneSignal,SocialSharing]

})
export class MyApp {
    noOfItems: number;
    newsCounter: number;
    offerCounter = 0;
    @ViewChild(Nav) nav: Nav;

    rootPage: any;
    imageUrl:any
    dipslayimage:boolean= false
    Screens:any=[]
    AppSttings:any=[]
    AppIcon:any
    Backgroundcolor:any

    constructor(public platform: Platform,
                public service: Service,
                public socketService:SocketService,
                private userService:UserService,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                public oneSignal: OneSignal,
                public socialSharing:SocialSharing,
                public events:Events,
                public constService:ConstService,
                public translateService:TranslateService) {

        platform.ready().then((res) => {
            if (res == 'cordova') {
               // this.oneSignal.startInit('230d3e93-0c29-49bd-ac82-ecea8612464e', '714618018341');
               // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
               // this.oneSignal.handleNotificationReceived().subscribe(() => {
               // });
               // this.oneSignal.handleNotificationOpened().subscribe(() => {
                  //  console.log("notification opened!");
               // });
               // this.oneSignal.endInit();
            }
            statusBar.styleDefault();
            splashScreen.hide();
        });


        this.service.getData()
            .subscribe((response) => {
                this.newsCounter = response.newsList.length;
                for (let i = 0; i <= response.menuItems.length - 1; i++) {
                    if (response.menuItems[i].offer != null) {
                        this.offerCounter = this.offerCounter + 1;

                    }
                }
            })
    }

     ngOnInit(): any {
        if (!this.isLogin()) {
            this.rootPage = "LoginPage";
        }
        else {
            this.rootPage = "HomePage";
            this.socketService.establishConnection();
            this.renderImage();
            //this.listenEvents();
        }
        this.useTranslateService();
       // this.getscreendata()
        //this.getAppSettings()
       // this.gettingClientDetails()
    }


    private useTranslateService(){
      // let value= localStorage.getItem('language');
      // let language = value!=null ? value:'en';
      // this.translateService.use(language);
      let value= localStorage.getItem('language');
      let language = value!=null ? value:'en';
      language=='ar'?this.platform.setDir('rtl', true):this.platform.setDir('ltr', true);;
      this.translateService.use(language);
    }
    
   private renderImage(){
       if(this.isLogin()){
        this.userService.getUser()
        .subscribe(user=>{
            console.log(user)
            //alert("user")
            this.imageUrl = this.constService.base_url+"api/users/profileImg/"+user._id+"?clientID="+this.constService.clientId+"&RegisterId="+user.RegisterId+"&profileImg="+user.profileImg
              console.log(this.imageUrl)
              this.dipslayimage = true
            // this.imageUrl=user.imageUrl!=null?this.imageUrl=user.imageUrl:this.imageUrl='assets/img/profile.jpg';
        }, error =>{
         this.nav.setRoot("LoginPage");
        })
       }
        
    }

   public listenEvents(){
        this.events.subscribe('imageUrl',(imageUrl)=>{
           this.imageUrl=imageUrl;
            //console.log("listen----->>>>>>"+imageUrl);
            this.renderImage();
        })
    }

    getscreendata(){
           
        this.userService.GetingScreens().subscribe(data=>{
            for(let i=0;i<data.length;i++){
                this.Screens.push(data[i].screenTitle)
            }

            localStorage.setItem('Screens', this.Screens);
        })
 }

 getAppSettings(){
     this.userService.GetAppSettings().subscribe(data=>{
         console.log(data)
         this.AppSttings = data
         if(this.AppSttings.length == 1){
             console.log(this.AppSttings)
             this.Backgroundcolor =  this.AppSttings[0].headercolor
           localStorage.setItem('headercolor', JSON.stringify(this.AppSttings[0]));
           this.AppIcon=this.constService.base_url+"api/appsettings/appicon/"+this.AppSttings[0]._id+'?clientID='+this.constService.clientId+'&id='+this.AppSttings[0]._id+'&appicon='+this.AppSttings[0].appicon
           localStorage.setItem('headerIcon', JSON.stringify([this.AppIcon]));
         }

     })
 }

 gettingClientDetails(){
     this.userService.GetClientDetailsById().subscribe(data=>{
         console.log("cleint detils")
         console.log(data)
         localStorage.setItem('ClientData', JSON.stringify(data));
     })
 }


    isLogin() {
        return localStorage.getItem('token') != null 
    }


    home() {
        this.nav.setRoot("HomePage");
    }

    catagory() {
      //  this.nav.push("CategoryPage");
        this.nav.setRoot("RegistrationPage");
    }

    gotoCart() {
        this.nav.push("CartPage");
    }

    yourOrders() {
       this.nav.setRoot("OrdersPage");
    }

    favourite() {
        this.nav.setRoot("FavouritePage");
    }

    offer() {
        this.nav.push("OfferPage");
    }

    news() {
        this.nav.setRoot("NewsPage");
    }

    contact() {
        this.nav.push("ContactPage");
    }

    settings() {
        this.nav.setRoot("Settings");
    }

    aboutUs() {
        this.nav.push("AboutUsPage");
    }
     invite() {
    this.socialSharing.share("share Restaurant App with friends to get credits", null, null, 'https://ionicfirebaseapp.com/#/');
  }
    
    chat(){
      this.nav.push("ChatPage");
    }
     orderStatus(){
      this.nav.push("OrderStatusPage");
    }
    login() {
        this.nav.setRoot("LoginPage");
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        localStorage.removeItem('userdetails')
        localStorage.removeItem('userImage')
        this.events.publish('imageUrl','assets/img/profile.jpg')
        localStorage.clear()
        this.nav.setRoot("LoginPage");
    }

    isCart() {
      let cart = JSON.parse(localStorage.getItem('cartItem'));
      cart != null?this.noOfItems = cart.length:this.noOfItems=null;
    return true;  
  }
  userImage(){
     
      this.imageUrl =  localStorage.getItem('userImage');
      if(this.imageUrl == null){
          this.imageUrl = "assets/img/profile2.jpg"
      }else{

      }
      return true; 
  }
}
