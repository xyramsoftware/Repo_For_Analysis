import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {RegistrationService} from '../registration/registration.service';
/**
 * Generated class for the Register5Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register5',
  templateUrl: 'register5.html',
  providers:[RegistrationService]
})
export class Register5Page {

  formdata:any={}
  eventTypes:any=[]
  categorydata:any=[]
  displayeventlist:any=[]
  currnetEventSelectd:any={}
  sportIndividualReg:any=[]
  eventDetails:any=[]
  paymentEvents:any=[]
  loader1:any
  loader:any
  eventObj:any=[]

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,public registrationService: RegistrationService,) {
    console.log(this.navParams.data)

     

    this.formdata = this.navParams.data

    if (this.formdata.orderdata.email == "") {
      this.formdata.orderdata.emailCheck = false
    } else {
      this.formdata.orderdata.emailCheck = true
    }
      console.log(this.formdata)

      this.getevetTypes()
      this.gettinfevents()
  }

  gettinfevents(){
    this.registrationService.getallEvents().subscribe(data=>{
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
    this.formdata.orderdata['SpectatorEventList'] = this.eventObj
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register5Page');
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
        this.loader.dismiss()
        for(let i=0;i<this.categorydata.length;i++){
          for(let j=0;j<this.eventTypes.length;j++){

            if(this.eventTypes[j].eventTypeName ==  'Individual Event' && this.categorydata[i].categoryName == 'Cultural'){
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

  checkboxOptions(event){
    console.log(event)
    console.log(event)
    this.currnetEventSelectd = event
    event.type = "Individual"
  if(event.checked ==  false){
   event.checked = true

    if(event.paymentGateway == true){
      //this.displayToast('This event have payment', 1500);
      //this.showAlert('This Event requires Payment to attend.Ammount Of:'+event.price +" Rs");
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


  register(){


    this.loader1 = this.loadingCtrl.create({
      content: 'please wait'
  })
 
    this.loader1.present();
    
    console.log(this.formdata.orderdata)
    
    console.log(this.eventDetails)
    //if(this.RegisterTeam)
    console.log(this.formdata.orderdata)
    this.formdata.orderdata.phone = 91 + this.formdata.orderdata.phone
    this.formdata.orderdata.culturalReg = this.sportIndividualReg
    for (let i = 0; i < this.eventDetails.length; i++) {
      this.formdata.orderdata.QREvents.push(this.eventDetails[i].title)
      if (this.eventDetails[i].paymentGateway == true) {
        this.formdata.orderdata.paymentEvents.push(this.eventDetails[i])
      }

      let QrcodeObj = {
          EventId: this.eventDetails[i]._id,
          EventName: this.eventDetails[i].title,
          QREventScan: false
      }


      this.formdata.orderdata.TotalEventsList.push(QrcodeObj)
    }

      if(this.formdata.orderdata.emailCheck == false){
        delete this.formdata.orderdata.email
      }

    if(this.formdata.orderdata.paymentEvents.length == 0){
      this.registrationService.createUser(this.formdata.orderdata).subscribe(data=>{
        this.loader1.dismiss()
          console.log(data)
  
        this.navCtrl.setRoot("ThankyouPage",{type:'reg'});
  
       })
     }
     else{
         this.loader1.dismiss()
         this.navCtrl.push("CheckoutPage",{ update:false,orderdata:this.formdata.orderdata})

     }

   
  }

}
