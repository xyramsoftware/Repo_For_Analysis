import {Component} from '@angular/core';
import {NavController, Events , IonicPage,ToastController,LoadingController,Platform} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {TranslateService} from 'ng2-translate';
import {UserService} from '../../providers/user-service';
import {FileUploader} from 'ng2-file-upload';
import {CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import {SettingsService} from './settings.service';


@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
    providers:[SettingsService]
})
export class Settings {

  Accommodation: FormGroup;
  showsubhotelType:boolean = false
  AditionalCharge:boolean = false 
  UserDetails:any={}

    user: any = {
      flag:0
    };
    preview:string;
    value: any;
   
  userId:string;
  loader:any
  loader2:any
  imageUrl:string='assets/img/profile.jpg';
  public notification:any;
  displayform:any
  Payload:any

  AccomidationDetails:any

  DisplayAccommodation:boolean = false


    header:any
    buttonWhite:any
    settingdata:any
    AppIcon:any
    questionsarray1:any[]
    validationsObject: any = {};
    userfirstpage: FormGroup;
    filename:any
    QrcodeData:any=[]
    displyErrorMessage:boolean = false
    payloaddata:any={}
    userPauloaddata:any=[]
    details:any=[]
    displaydata:any=[]


      LatestNews:any=[]

    constructor(public navCtrl: NavController,
                public events:Events,
                public platform:Platform,
                private loadingCtrl:LoadingController,
                private toastCtrl:ToastController,
                public translate: TranslateService,
                private userService: UserService,
                public fb: FormBuilder,
                private settingService:SettingsService) {

                this.gettingNews()    
                   

                
                
    }


    ngOnInit() {

     
       
    }


    gettingNews(){
      this.settingService.getLatestNwes().subscribe(data=>{
           this.LatestNews = data
           console.log(this.LatestNews)
      })
    }



    
    createToaster(message, duration) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
    }



    
    // getTimeAnswer(id:any,value:any){
    //   console.log(value)
    //   for(let i=0;i<this.questionsarray1.length;i++){
    //     if(id == this.questionsarray1[i]._id){

    //        // console.log(value)
    //         let time = value.hour+":"+value.minute
    //         let hour = (time.split(':'))[0]
    //         let min = (time.split(':'))[1]
    //         let hour1 = +(time.split(':'))[0]
    //         let part = +hour > 12 ? 'pm' : 'am';
    //         min = (min+'').length == 1 ? `0${min}` : min;
    //         hour1 = +hour > 12 ? +hour - 12 : +hour;
    //         console.log("hours",hour1)
    //         let time2 = `${hour1}:${min} ${part}`
    //         console.log("///")
    //         console.log(time2)
          
    //       this.questionsarray1[i].Ans = time2
    //       console.log(this.questionsarray1[i].Ans)
    //     }
    //   }
    // }

    // getDateAnswer(id:any,value:any){

    //   let day = value.day;
    //   let month = value.month;
    //   let year = value.year;
    //   if (day < 10) {
    //     day = '0' + day;
    //   }
    //   if (month < 10) {
    //     month = '0' + month;
    //   }
    //   let date = day + '/' + month + '/' + year;

    //   for(let i=0;i<this.questionsarray1.length;i++){
    //     if(id == this.questionsarray1[i]._id){
    //       this.questionsarray1[i].Ans = date
    //     }
    //   }

    // }

   



      
}
