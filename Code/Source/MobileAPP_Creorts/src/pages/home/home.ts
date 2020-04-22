import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { Service } from '../../app/service';
import { HomeService } from './home.service';
import { ConstService } from "../../providers/const-service";

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [Service, HomeService]
})
export class HomePage {
    categories: any[];
    featured: any[];
    cartItems: any[];
    noOfItems: number;
    lat: any
    lng: any
    carsoels: any = []
    pushImage: any = {}
    Images: any = []
    imagecount: any
    AppIcon: any

    header: any
    buttonWhite: any
    settingdata: any
    socialcount: any
    constructor(public navCtrl: NavController,
        public service: Service,
        public homeService: HomeService,
        public constService: ConstService,
        public loadingCtrl: LoadingController) {


        this.cartItems = JSON.parse(localStorage.getItem('cartItem'));
        if (this.cartItems != null) {
            this.noOfItems = this.cartItems.length;
        }
        this.getCarosels()
        this.getsocialCount()
    }


    getsocialCount() {
        this.homeService.getSocialCount().subscribe(data => {
            console.log("////////////")
            console.log(data)
            this.socialcount = data
        })
    }

    getCarosels() {
        this.homeService.getCaroselDate().subscribe(data => {
            console.log(data)
            this.carsoels = data
            for (let i = 0; i <= this.carsoels.length; i++) {
                if (this.carsoels[i] != undefined) {
                    this.pushImage = { key: i, thumb: this.constService.base_url + "api/carousel/download/id" + this.carsoels[i]._id + '?id=' + this.carsoels[i]._id + '&carousel=' + this.carsoels[i].carousel, title: this.carsoels[i].title, titlecheckbox: this.carsoels[i].titlecheckbox, descriptioncheckbox: this.carsoels[i].descriptioncheckbox }
                    this.Images.push(this.pushImage)
                    console.log(".............")
                    console.log(this.Images)
                }
            }
            this.imagecount = this.Images.length - 1
            console.log(this.imagecount)
        })
    }

    ionViewDidLoad() {
        this.lat = 39.186889
        this.lng = -77.242155
        let loader = this.loadingCtrl.create({
            content: 'please wait..'
        })

    }

    navigate(MenuId) {
        this.navCtrl.push("ProductListPage",
            { MenuId: MenuId }
        );
    }

    navcart() {
        this.navCtrl.push("CartPage");
    }

    updatecout(obj:any) {
        console.log(obj)
        this.homeService.UpdateCount(obj, this.socialcount[0]._id).subscribe(data => {
            console.log(data)
        })
    }

    doFbLogin(name: any) {
        console.log(name)
        let obj = {
            "type":"facebook"
        }
        //this.socialcount[0].facebook = this.socialcount[0].facebook + 1
        this.updatecout(obj)
        window.open("https://www.facebook.com/CREORTS/?hc_ref=ARTxbA_3bMe-jqUSq9_IokuqFYUZM0fOjP5EuB0_RmjLU-WPz6fxgulon1O7fAyIYWo&fref=nf&__xts__[0]=68.ARClbua1VCVvcE-_0vr0jlTJOPkROtOmCD6QXcLlRLLY2pUAnJ3UmpHd0xOzEEZHo7LDcU3aK6TuFWFX0G2Z_NV9PqwUC8VoSrr3Emq3tOJVn-4hWBP1vUSUju8BtPFVTfGTlYFvQfYt0I3i02aHe5t4vPa-NlIxTSPAOQ_Dc9fVmywFcDEaDH-prTQB5ErLShg_14sZi0-Oppz9TAeTzbWb43kQK7FxheJUp6LWRcrCpKHuRmqHH3dnxg6pFQRiKnOyrtXPCh-p-JbtA__S6tLr4CR-0dzUKxs-sDaclKjYevBfA6k9O7kP8szzZqOSpmzWDih4K2U0JMqj1ptDzgjAxbpn&__tn__=kC-R")
       // console.log(this.socialcount)
    }
    instaLogin(name: any) {
        console.log(name)
        let obj = {
            "type":"instagram"
        }
        this.updatecout(obj)
        //this.socialcount[0].instagram = this.socialcount[0].instagram + 1
        window.open("https://www.instagram.com/creorts/?hl=en")
    }
    twitterLogin(name: any) {
       // console.log(name)
       let obj = {
        "type":"twitter"
    }
        this.updatecout(obj)
        //this.socialcount[0].twitter = this.socialcount[0].twitter + 1
        window.open("https://media.twitter.com/en_us/creators.html")
    }

}
