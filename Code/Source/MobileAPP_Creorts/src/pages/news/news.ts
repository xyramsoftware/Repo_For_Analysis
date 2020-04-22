import {Component} from '@angular/core';
import {NavController, NavParams, IonicPage,LoadingController} from 'ionic-angular';
import {NewsService} from './news.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';


@IonicPage()
@Component({
    selector: 'page-news',
    templateUrl: 'news.html',
    providers: [NewsService]
})
export class NewsPage {
    newsList: any[];
    ReferFriend:FormGroup
    UserDetails:any={}
    friendsList:any=[]
    nubervalidatin:boolean = false
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private loadingCtrl:LoadingController,
                public fb: FormBuilder,
                public newsService: NewsService) {
                    this.UserDetails   = JSON.parse(localStorage.getItem('userdetails'));
                   // console.log(this.UserDetails)
                    
                    this.getreferfrindsList()
    }

    ngOnInit() {
        let  pattern1 =  "^[0-9_-]{10,12}";
        this.ReferFriend = this.fb.group({
            name: ['', Validators.required],
            phone:['', [Validators.required, Validators.pattern(pattern1)]],
           
        });
        let loader =this.loadingCtrl.create({
            content:'please wait'
        })
        loader.present();
        loader.dismiss();
    

    }

 
    getreferfrindsList(){
        console.log(this.UserDetails)
        this.newsService.getReferFriendList(this.UserDetails._id).subscribe(data=>{
            console.log(data)
            this.friendsList = data.reverse();
        })
    }

    NumberValidation(value: any) {
        //  console.log(value.length)
        if (value.length <= 9) {
          this.nubervalidatin = true
        } else {
          this.nubervalidatin = false
        }
    
      }

    onRegister(){

        this.ReferFriend.value
        let Obj = {
            name:this.ReferFriend.value.name,
            phone:91+this.ReferFriend.value.phone,
            userID:this.UserDetails._id
        }
        this.newsService.CreateReferFrind(Obj,this.UserDetails._id).subscribe(data=>{
            console.log(data)
            //this.ReferFriend
            console.log(this.ReferFriend.value.name)
            console.log(this.ReferFriend.value.phone)
            this.ReferFriend.value.name = ''
            this.ReferFriend.value.phone = ''
            this.getreferfrindsList()
            this.ngOnInit()
        })
    }

}
