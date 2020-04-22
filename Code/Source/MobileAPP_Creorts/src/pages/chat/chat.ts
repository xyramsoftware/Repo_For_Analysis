import {ViewChild, Component} from '@angular/core';
import {Content} from 'ionic-angular/index';
import {IonicPage, NavController, NavParams,LoadingController,ToastController} from 'ionic-angular';
import {ChatService} from "./chat.service";
import {UserService } from '../../providers/user-service';
import {SocketService } from '../../providers/socket-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Ng2ImgMaxService } from 'ng2-img-max';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers:[ChatService]
})
export class ChatPage {

  page:number = 0
  limit:number =6

  gallery:any=[]
  maingallarypage:any=[]
  displauLoadMore:boolean = false

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl:LoadingController,
              public chatService:ChatService,
              public userService:UserService,
              public fb: FormBuilder,
              private ng2ImgMax: Ng2ImgMaxService,
              public toastCtrl: ToastController,
              public socketService:SocketService) {
               
              /// this.Gatgalarydata() 
               this.getlimitdata()

             
				
  }
  Gatgalarydata(){
    let loader =this.loadingCtrl.create({
      content:'please wait'
    })
    loader.present();
    this.chatService.getGalary().subscribe(data=>{
      console.log(data)
      loader.dismiss();
      //this.gallery = data
    })
  }

  getlimitdata(){
    let loader =this.loadingCtrl.create({
      content:'please wait'
    })
    loader.present();
    this.gallery=[]
    this.chatService.getGalaryLimitImages(this.page,this.limit).subscribe(data=>{
      console.log(data)
      loader.dismiss();
      this.gallery = data.books
      for(let i=0;i<this.gallery.length;i++){
        this.maingallarypage.push(this.gallery[i])
      }
     // this.maingallarypage.push(data.books)
      console.log(this.maingallarypage)
      if(this.maingallarypage.length >= data.total){
          this.displauLoadMore = false
      }else{
        this.displauLoadMore = true
      }
    })
  }

  ngOnInit() {
   
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    
    
  }

  LoadMore(){
    this.page = this.page+1
    this.limit = 6
   this. getlimitdata()
  }


    
}



  
 
  

  
  



 

  

