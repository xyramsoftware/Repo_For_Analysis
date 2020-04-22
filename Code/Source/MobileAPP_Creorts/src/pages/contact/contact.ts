import {Component} from '@angular/core';
import {NavController, NavParams, IonicPage, ToastController,LoadingController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {EmailComposer} from '@ionic-native/email-composer';
import { OfferService } from '../offer/offer.service'
import { ContactService } from './contact.service';


@IonicPage()
@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
    providers: [EmailComposer,OfferService,ContactService]
})
export class ContactPage {
    
    UserDetails:any
    displaymoreinput:boolean = false
    displayuserdetails:boolean = false
    Organizationrate:any
    eventrate:any
    likedmost:any
    likedleast:any
    Bringinglife:any
    experience:any
    nextsportival:any    

     feedbackdata:any=[]
    loader:any

   displahfeedback:boolean = true
   
    checkedIdx:any;
    checkedIdx1:any;
    options = [
      'Excellent',
      'Good',
      'Satisfactory',
      'Poor',
      'Not Applicable'
    ];

    options1 = [
      'Excellent',
      'Good',
      'Satisfactory',
      'Poor',
      'Not Applicable'
    ]
   

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl: ToastController,
                public fb: FormBuilder,
                private loadingCtrl:LoadingController,
                private offerItemsService:OfferService,
                private contactService:ContactService,
                public emailComposer: EmailComposer) {
                  

    }

    ngOnInit() {


      this.loader = this.loadingCtrl.create({
        content:'please wait'
    })
    this.loader.present();
        
        this.UserDetails   = JSON.parse(localStorage.getItem('userdetails'));
        if(this.UserDetails == null){
            this.displayuserdetails = false
            this.loader.dismiss();
        }else{
          this.loader.dismiss();
          this.gettigfeedback()
            this.displayuserdetails = true
           // this.getDrop()
        }
        // this.PickupCAndDrop = this.fb.group({
        //     RegisterName: [],
        //     RegisterEmail: [],
        //     RegisterNumber: [],
        //     PickupNeed :['',Validators.required],
        //     PickupPoint:['',Validators.required],
        //     Droppoint:['',Validators.required],
        //     ArrivalDate :['',Validators.required],
        //     ArrivalTime :['',Validators.required],
        //     DepatureDate: ['', Validators.required],
        //     DepatureTime: ['', Validators.required],
        // });
    }

    gettigfeedback(){
      this.contactService.GetAllFeedback(this.UserDetails._id).subscribe(data=>{
        //console.log(data)
        if(data.length  !==0){
          this.feedbackdata = data[0]
          console.log(this.feedbackdata)
          console.log(this.feedbackdata.positiveComments)
          console.log(this.feedbackdata.negativeComments)
          this.displahfeedback =  false
        }
      })
    }
 

   

    isLogin() {
        return localStorage.getItem('token') != null;
    }
    loginpage(){
        this.navCtrl.setRoot("LoginPage")
    }

    
    rateOrganization(event:any){

      console.log(event)
      this.Organizationrate = event

      
    }

    rateEvent(event:any){
       console.log(event)
       this.eventrate = event
    }

    Submit(){


      let Obj={
        rateOrganization: this.Organizationrate,
        rateEvent:this.eventrate,
        positiveComments:this.likedmost,
        negativeComments:this.likedleast,
        objective:this.Bringinglife,
        experience:this.experience,
        partofNextSportival:this.nextsportival,
        userID:this.UserDetails._id,
        userInfo:[{
           name:this.UserDetails.name,
           phone:this.UserDetails.phone
        }]
      }

        if(Obj.rateOrganization !== undefined && Obj.rateEvent !== undefined ){

          console.log("data is there")
          this.contactService.CreateFeedback(Obj,this.UserDetails._id).subscribe(data=>{
            console.log(data)
            this.gettigfeedback()
            this.displahfeedback =  false
          })
          
        }else{
         
        }
       
      console.log(Obj)
  

    }
      
   

  

}
