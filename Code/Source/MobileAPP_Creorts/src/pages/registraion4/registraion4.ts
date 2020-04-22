import { Component } from '@angular/core';
import {NavController, IonicPage, AlertController,LoadingController,NavParams,ToastController, Platform} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {RegistrationService} from '../registration/registration.service';

import { ImageCroppedEvent } from 'ngx-image-cropper';

import { Ng2ImgMaxService } from 'ng2-img-max';
import { CompileMetadataResolver } from '@angular/compiler';


/**
 * Generated class for the Registraion4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registraion4',
  templateUrl: 'registraion4.html',
  providers:[RegistrationService]
})
export class Registraion4Page {
  
  loader:any
  loader1:any
  eventTypes:any=[]
  formdata:any=[]
  categorydata:any=[]

  displayeventlist:any=[]
  currnetEventSelectd:any={}
  sportIndividualReg:any=[]
  eventDetails:any=[]
  QRevnt:any=[]

  representingTeam:any
  QrCodeScanItem:any=[]
  paymentEvents:any=[]
  Selectedevents:any
 
  constructor(public navCtrl: NavController,private ng2ImgMax: Ng2ImgMaxService,
     public navParams: NavParams ,public alertCtrl: AlertController,public registrationService: RegistrationService,
     public loadingCtrl: LoadingController,public toastCtrl: ToastController,
     public fb: FormBuilder) {

      //this.AppIcon = JSON.parse(localStorage.getItem('headerIcon'));
      console.log(this.navParams.data)
      this.formdata = this.navParams.data
        console.log(this.formdata)
     
      this.getevetTypes()
  }

  getevetTypes(){
    this.loader= this.loadingCtrl.create({
      content:'please wait..'
  })
  this.loader.present();
    this.registrationService.getallEventsTypes().subscribe(data=>{
      console.log(data)
      this.eventTypes = data
      this.eventcategory()
    })
    
  }


  eventcategory(){
   
      this.registrationService.GetAllcategory().subscribe(data=>{
          console.log(data)
          this.categorydata = data
          this.loader.dismiss();
          for(let i=0;i<this.categorydata.length;i++){
            for(let j=0;j<this.eventTypes.length;j++){

              if(this.eventTypes[j].eventTypeName ==  'Individual Event' && this.categorydata[i].categoryName == 'Sports'){
                this.registrationService.geteventsByEventType(this.categorydata[i]._id,this.eventTypes[j]._id).subscribe(data=>{
               
                   console.log("sport individual")
                   for(let j=0;j<data.length;j++){
                    data[j]['checked']= false
                  }
                    this.displayeventlist = data
                    console.log(data)

                })
              }

            }
          }
      })
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Registraion4Page');
  }

  ionViewDidEnter(){

    setTimeout(() => {

      this.Selectedevents =  (JSON.parse(localStorage.getItem('SelectedEvents')))   
     if(this.Selectedevents !== null){
       console.log("////////////////////////////////////////")
      console.log(this.Selectedevents)
      
      if(this.Selectedevents.RegisterDetails.sportIndividualReg.length !==0){
        for(let i=0;i<this.displayeventlist.length;i++){
          console.log(this.displayeventlist[i])
              for(let j=0;j<this.Selectedevents.RegisterDetails.sportIndividualReg.length;j++){
               console.log(this.displayeventlist[i])
              console.log( this.Selectedevents.RegisterDetails.sportIndividualReg[j])
                if(this.displayeventlist[i]._id == this.Selectedevents.RegisterDetails.sportIndividualReg[j]._id){
                  this.displayeventlist[i].checked = true
                }

              }
            }  
      }
      console.log(this.displayeventlist)
     }else{

     }
      
    }, 1000);

    
  }

  ngOnInit(): any {

  
  }

  displayToast(message: string,duration: number){
    let toast = this.toastCtrl.create({
                message: message,
                duration: duration
            });
            toast.present();

}


  showAlert(message:any){
    console.log(message)
    let alert = this.alertCtrl.create({
     subTitle: message,
     buttons: ['OK']
   });
   alert.present();
    }
  checkboxOptions(event){
    console.log(event)
    console.log(event)
    this.currnetEventSelectd = event
    event.type = "Individual"
  if(event.checked ==  false){
   event.checked = true

    if(event.paymentGateway == true){
      //this.displayToast('This Event requires Payment to attend.Price '+event.price, 1500);
      this.showAlert('Its a paid event, you need to pay Rs'+event.price +'!' );
    }

   this.sportIndividualReg.push(event)
   this.eventDetails.push(event)

 }else{
   event.checked = false
    for(let i=0;i<this.eventDetails.length;i++){
      if(this.eventDetails[i]._id == event._id){
        this.eventDetails.splice(i,1)
      }
    }

    for(let i=0;i<this.sportIndividualReg.length;i++){
      if(this.sportIndividualReg[i]._id == event._id){
        this.sportIndividualReg.splice(i,1)
      }
    }
 }
 
 console.log(this.sportIndividualReg)
 console.log(this.eventDetails)
 }


 Next(){


  this.paymentEvents = []
  this.QrCodeScanItem = []
  this.QRevnt = []
  for(let i=0;i<this.eventDetails.length;i++){
    
    this.QRevnt.push(this.eventDetails[i].title)
    let QrcodeObj = {
      EventId :  this.eventDetails[i]._id,
      EventName: this.eventDetails[i].title,
      QREventScan:false
    }
     console.log(QrcodeObj)
    this.QrCodeScanItem.push(QrcodeObj)
    if(this.eventDetails[i].paymentGateway == true){
      this.paymentEvents.push(this.eventDetails[i])
    }
  }

 
    this.formdata.RegisterDetails.QREvents = this.QRevnt
    this.formdata.RegisterDetails.sportIndividualReg = this.sportIndividualReg
    this.formdata.RegisterDetails.paymentEvents = this.paymentEvents 
    this.formdata.RegisterDetails.TotalEventsList = this.QrCodeScanItem
 
     console.log("////////////////////")
     
    console.log(this.formdata)
   // localStorage.setItem('SelectedEvents', JSON.stringify(this.formdata));

  this.navCtrl.push("RegistrationSecondPage", { RegisterDetails: this.formdata })
 }



     

}
