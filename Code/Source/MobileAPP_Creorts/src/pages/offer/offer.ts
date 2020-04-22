import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides,IonicPage,LoadingController,ToastController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { OfferService } from './offer.service'; 

import { Ng2ImgMaxService } from 'ng2-img-max';


import * as moment from 'moment';

@IonicPage()
@Component({
    selector: 'page-offer',
    templateUrl: 'offer.html',
    providers: [OfferService]
})
export class OfferPage {
    @ViewChild(Slides) slides: Slides;
    offerProducts: any[] = [];
    offerPrice: number;
    displayuserdetails:boolean = false
    AccompanyingPerson: FormGroup;

    
    UserDetails:any={}
    formdata:any
    urlPhoto:any
    urlIdentity:any
    uploadimageIdentity:boolean = false
    uploadimagephoto:boolean = false
    filesToUpload:any
    filenamePhoto:any
    filenameIdentity:any
    EmailErrorMessage:boolean = false
    errermessage:boolean = false
    loader:any
    notaAccopmaylerson:boolean = true
    personavilabe:boolean=false
    accompanyingperson:any=[] 
    accompanyingpersonData:any=[]
    DisplayAccompanydata:boolean = false
    age:any
    loader1:any
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
    Obj:any=[]
    dislayschool:boolean = false
    displayaccompanydata:any
    entersschoolName:boolean = false
    eventObj:any=[]

    date:any
    

    nubervalidatin:boolean=false
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private loadingCtrl:LoadingController,
                public fb: FormBuilder,
                private ng2ImgMax: Ng2ImgMaxService,
                public toastCtrl: ToastController,
                private offerItemsService:OfferService) {

                this.date = moment().subtract(5, 'years').toDate();

                this.date = moment(this.date).format('YYYY-MM-DD')
                
                console.log(this.date)

                  this.getevetndata()
                   
    }


   

   

    ngOnInit() {
        this.formdata= new FormData();
        this.loader= this.loadingCtrl.create({
            content:'please wait..'
        })
        this.loader.present();
        this.UserDetails   = JSON.parse(localStorage.getItem('userdetails'));
        console.log(this.UserDetails)
        if(this.UserDetails == null){
            this.displayuserdetails = false
            this.loader.dismiss();
        }else{
            this.displayuserdetails = true
            this.loader.dismiss();
           this.getAccompanyPerson()
        }

        if(this.UserDetails !== null){
            
        }
     
      
       
       this.AccompanyingPerson = this.fb.group({
        name: ['', Validators.required],
        gender: ['', Validators.required],
        relationship: ['',Validators.required],
        DOB:['',Validators.required],
        phone:['',Validators.required],
        place: ['', Validators.required],
        email:[''],
        occupation:['',Validators.required],
        schoolName:[''],
        organisation:['']
    });
   
   // this.gettingforms()
    //this.getQrcodeFields()
    }


    getevetndata(){

      this.offerItemsService.getallEvents().subscribe(data=>{
        console.log("events")
        console.log(data)
        for(let i=0;i<data.length;i++){
          let Obj={
            EventId:data[i]._id,
            EventName:data[i].title,
            QRScanCheck:false
          }  
           this.eventObj.push(Obj)  
        }
       console.log(this.eventObj)
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
    getAccompanyPerson(){
        console.log(this.UserDetails._id)
        console.log(this.UserDetails)
        this.offerItemsService.getACccompanyperson(this.UserDetails._id).subscribe(data=>{
            //alert("accompany person")
            console.log(data)
            this.accompanyingpersonData = data
            this.displayaccompanydata = true
            console.log(this.accompanyingperson)
           // this.loader.dismiss();
            if(data[0] == undefined){
                this.personavilabe=true
            }else{
                this.personavilabe=false
                this.accompanyingperson = data[0]
                console.log(this.accompanyingperson.accompanyPersonInfo)
               console.log(this.displaydata) 
          
                 this.age = moment().diff(data[0].DOB, 'years',false);
                console.log(this.age)
                this.DisplayAccompanydata = true
               
            }
        })
    }
   
    isLogin() {
        return localStorage.getItem('token') != null;
    }

    loginpage(){
        this.navCtrl.setRoot("LoginPage")
    }

    gotoNextSlide() {
        this.slides.slideNext();
    }

    gotoPrevSlide() {
        this.slides.slidePrev();
    }

    buyNow(productId) {
        this.navCtrl.push("ProductDetailsPage", {
            productId: productId
        });
    }



    displayToast(message: string,duration: number){
        let toast = this.toastCtrl.create({
                    message: message,
                    duration: duration
                });
                toast.present();
    
    }


    EmailValidator(){
      console.log(this.AccompanyingPerson.value.email)
       
          var emailval =  (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
        
           if(this.AccompanyingPerson.value.email.match(emailval)){
            this.EmailErrorMessage = false
           }else if(this.AccompanyingPerson.value.email.trim() == ""){
             this.EmailErrorMessage = false
           }
           else{
            this.EmailErrorMessage = true
           }
        
        }


    onRegister(){

      this.loader1= this.loadingCtrl.create({
        content:'please wait..'
    })
    this.loader1.present();
        console.log(this.AccompanyingPerson.value)
        this.Obj = this.AccompanyingPerson.value
        this.Obj['AccompanyEventList'] = this.eventObj
         //this.validation()
          if(this.Obj.email ==""){
            this.Obj.emailCheck = false
            delete this.Obj.email
          }else{
            this.Obj.emailCheck = true
          }

          if(this.AccompanyingPerson.value.occupation == "Student" ){
               if( this.AccompanyingPerson.value.schoolName == ""){
              this.entersschoolName = true
              this.loader1.dismiss();
         }else{
           
          if(this.Obj.emailCheck == true){
        //     if( this.AccompanyingPerson.schoolName == ""){
        //       this.entersschoolName = true
        //  }else{
             console.log(this.AccompanyingPerson.value.email)
            var emailval =  (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
            if(this.AccompanyingPerson.value.email.match(emailval)){
              this.EmailErrorMessage = false
              console.log("goo")
              this.offerItemsService.createaccompany(this.Obj,this.UserDetails._id).subscribe(data=>{
                console.log(data) 
                this.loader1.dismiss();
               this.navCtrl.setRoot("ThankyouPage",{type:'accompany'});
             })
              
             }


            //  else if(this.AccompanyingPerson.value.email.trim() == ""){
            //    this.EmailErrorMessage = false
            //  }

             else{
              this.loader1.dismiss();
              this.EmailErrorMessage = true
              console.log("no goo")
              
             }
          }else{
            this.offerItemsService.createaccompany(this.Obj,this.UserDetails._id).subscribe(data=>{
              console.log(data) 
              this.loader1.dismiss();
             this.navCtrl.setRoot("ThankyouPage",{type:'accompany'});
           })
          }

        }
      }else{

        if(this.Obj.emailCheck == true){
          //     if( this.AccompanyingPerson.schoolName == ""){
          //       this.entersschoolName = true
          //  }else{
               console.log(this.AccompanyingPerson.value.email)
              var emailval =  (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
              if(this.AccompanyingPerson.value.email.match(emailval)){
                this.EmailErrorMessage = false
                console.log("goo")
                this.offerItemsService.createaccompany(this.Obj,this.UserDetails._id).subscribe(data=>{
                  console.log(data) 
                  this.loader1.dismiss();
                 this.navCtrl.setRoot("ThankyouPage",{type:'accompany'});
               })
                
               }
  
              //  else if(this.AccompanyingPerson.value.email.trim() == ""){
              //    this.EmailErrorMessage = false
              //  }
  
               else{
                this.loader1.dismiss();
                this.EmailErrorMessage = true
                console.log("no goo")
                
               }
            }else{
              this.offerItemsService.createaccompany(this.Obj,this.UserDetails._id).subscribe(data=>{
                console.log(data) 
                this.loader1.dismiss();
               this.navCtrl.setRoot("ThankyouPage",{type:'accompany'});
             })
            }



      }
             
    }

   
  
     
  
     
  
      getEmailAnswer(id:any,value:any){
        for(let i=0;i<this.questionsarray1.length;i++){
          if(id == this.questionsarray1[i]._id){
            this.questionsarray1[i].Ans = value
          }
        }
      }
  
      getDropdownAnswer(id:any,value:any){
        for(let i=0;i<this.questionsarray1.length;i++){
          if(id == this.questionsarray1[i]._id){
            this.questionsarray1[i].Ans = value
          }
        }
      }
   
      
    

      
   

////////////////////////////////////////
      selectOccupation(event:any){
        console.log(event)
        if(event == "Student"){
          this.dislayschool = true
        }else{
          this.dislayschool = false
        }
      
      }

      listdisplay(person:any){
        console.log(person)
        this.navCtrl.push("AboutUsPage",{persondata:person})
      }
}
