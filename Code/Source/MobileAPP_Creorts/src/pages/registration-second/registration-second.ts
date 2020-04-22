import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController  } from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {RegistrationService} from '../registration/registration.service';
import {ToastController} from 'ionic-angular';
import { style } from '@angular/core/src/animation/dsl';
/**
 * Generated class for the RegistrationSecondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration-second',
  templateUrl: 'registration-second.html',
  providers:[RegistrationService]
})
export class RegistrationSecondPage {
 
  countryList:any=[];
  displayforpassport:boolean =false
  permanentCountry:any
  showcontry:boolean=true
  uploadimage:boolean = false
  formdata:any
  filesToUpload:any
  uploadform:any
  filename:any
  url:any
  userinputvalidatio:boolean = false
  uploadImageValidation:boolean = false
  loader:any
  loader1:any
  loader2:any

  representingTeam:any

  coutryname:any

  displayeveterroer:boolean = false

  displayCountryname:boolean = true
  UserselectedEventList:any=[]

  sportIndividualReg:any=[]
  teamReg:any=[]
  QRevnt:any=[]
  QrCodeScanItem:any =[]
  currnetEventSelectd:any={}

   eventsList:any=[]

   categorydata:any= []

  
  
    eventTypes:any=[]

    eventDetails:any=[]
    events:any={}
    SelectedEvent1:any=[]
    userselectTeamEvent:any={}
    sprtiindividulaevents:any=[]
    culturaevent:any=[]
    paymentEvents:any =[]

    TotalEventsList:any=[]
    donotrepete:boolean= false

    Selectedevents:any=[]
    displayeventlist:any=[]
    representingTeamErrerMessage:boolean = false

  constructor(public navCtrl: NavController, public registrationService: RegistrationService,
    private fb: FormBuilder, public alertCtrl:AlertController,  public toastCtrl: ToastController,public loadingCtrl: LoadingController, public navParams: NavParams) {
      console.log(this.navParams.data)
      this.formdata = this.navParams.data
        console.log(this.formdata)
  }

  ngOnInit(): any {


    this.loader2 = this.loadingCtrl.create({
      content: 'please wait'
  })
  this.loader2.present();
    //  this.getallevents()

     // this.eventcategory()
      this.getevetTypes()

    

  }

  getevetTypes(){
    this.registrationService.getallEventsTypes().subscribe(data=>{
      console.log(data)
      this.eventTypes = data
      this.eventcategory()
    })
    
  }

  eventcategory(){
    this.registrationService.GetAllcategory().subscribe(data=>{

       // console.log(data)
        this.categorydata = data
      
        for(let i=0;i<this.categorydata.length;i++){
          for(let j=0;j<this.eventTypes.length;j++){

            if(this.eventTypes[j].eventTypeName ==  'Team Event' && this.categorydata[i].categoryName == 'Sports'){
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

        console.log(this.categorydata)
        this.loader2.dismiss();
    })
  }


  getallevents(){
    this.registrationService.GetAllEvents().subscribe(data=>{
       console.log(data)
       for(let j=0;j<data.length;j++){
        data[j]['checked']= false
      }
      this.eventsList = data
    })

  }


  displayToast(message: string,duration: number){
    let toast = this.toastCtrl.create({
                message: message,
                duration: duration
            });
            toast.present();

}

 

   photoupload(){

   }
  onRegisterSecondpage(){

  }

  

  

 

  Back(){
   this.navCtrl.pop()
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
      //this.displayToast('This event have payment', 1500);
      this.showAlert('This Event requires Payment to attend.Ammount Of:'+event.price +" Rs");
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

 
 

 checkboxOptionsForTeam(event:any){
 


      //console.log('@@@@@@@@@@@@@@@@@@@@@@@@@', event)
    this.currnetEventSelectd = event
    event.type = "TeamReg"
    console.log(event)

   
 if(event.checked ==  false){
   event.checked = true
   
   this.eventDetails.push(event)
   this.teamReg.push(event)
   this.navCtrl.push("RegistrationThirdPage",{eventdata:event})

 }else{
   event.checked = false
    for(let i=0;i<this.eventDetails.length;i++){
      if(this.eventDetails[i]._id == event._id){
        this.eventDetails.splice(i,1)
      }
    }
    for(let i=0;i<this.teamReg.length;i++){
      if(this.teamReg[i]._id == event._id){
        this.teamReg.splice(i,1)
      }
     
    }
    console.log(this.teamReg)
    console.log(this.eventDetails)
     
 }



    

 }



  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationSecondPage');
    
  }

ionViewDidEnter(){


  this.Selectedevents =  (JSON.parse(localStorage.getItem('SelectedEvents')))

  console.log(this.Selectedevents)


  console.log("did enter")
  //(JSON.parse(this.events))
  this.events =  (JSON.parse(localStorage.getItem('Events')))
  console.log("currnetEventSelectd", this.currnetEventSelectd)
  console.log('events', this.events)
  if(this.events !== null){
   console.log(this.events.checked)
   console.log(this.events.teamdetails)
    if(this.events.teamdetails == undefined){
      this.events.checked = false
    }

    console.log(this.events)
   // console.log(this.events.eventdata)
  console.log(this.SelectedEvent1.length)
  this.SelectedEvent1.push(this.events)
   console.log(this.SelectedEvent1)

    localStorage.removeItem('Events')
  }else{
   console.log("currnetEventSelectd", this.currnetEventSelectd)
   console.log(this.categorydata)
  //  if(this.currnetEventSelectd.checked !== undefined){
  
    console.log("backbutton display")
    this.currnetEventSelectd.checked = false;
    for(let i=0;i<this.eventDetails.length;i++){
      if(this.eventDetails[i]._id == this.currnetEventSelectd._id){
        this.eventDetails.splice(i,1)
      }
    }
    for(let i=0;i<this.teamReg.length;i++){
      if(this.teamReg[i]._id == this.currnetEventSelectd._id){
        this.teamReg.splice(i,1)
      }
     
    }

  //  }
   
 
  }
  

}

 ionViewWillEnter() {

 
  

  
  }


  RegisterTeam (){

    this.displayeveterroer = false

    this.loader1 = this.loadingCtrl.create({
      content: 'please wait'
  })
 
    this.loader1.present();
  this.sprtiindividulaevents = []
  this.culturaevent = []
  this.paymentEvents =[]
  this.QrCodeScanItem = []
  //if(this.eventDetails.length !== 0){
     console.log(this.SelectedEvent1)
     console.log(this.eventDetails)
     console.log(this.sportIndividualReg)
     console.log(this.teamReg)
     console.log(this.teamReg.length)
     console.log(this.formdata)
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

     console.log(this.paymentEvents)

     
     if(this.teamReg.length == 0){
       this.formdata.RegisterDetails.TeamCheck = false
     }else{
      this.formdata.RegisterDetails.TeamCheck = true
     }

     for(let j=0;j<this.sportIndividualReg.length;j++){
      if( this.sportIndividualReg[j].categoryName == "Sports" && this.sportIndividualReg[j].EventTypeName == "Individual Event"){
          
         console.log(this.sportIndividualReg[j])
       this.sprtiindividulaevents.push(this.sportIndividualReg[j])
      }
      if(this.sportIndividualReg[j].categoryName == "Cultural"){
           this.culturaevent.push(this.sportIndividualReg[j])
      }
     }
     this.formdata.RegisterDetails.representingTeam = this.representingTeam
     this.formdata.RegisterDetails.QREvents = this.QRevnt
     this.formdata.RegisterDetails.teamReg = this.teamReg
     this.formdata.RegisterDetails.sportIndividualReg = this.sprtiindividulaevents  
     this.formdata.RegisterDetails.culturalReg =   this.culturaevent
     this.formdata.RegisterDetails.paymentEvents = this.paymentEvents 
     this.formdata.RegisterDetails.TotalEventsList = this.QrCodeScanItem
     console.log(this.formdata.RegisterDetails)

      if(this.formdata.RegisterDetails.emailCheck == false){
        delete this.formdata.RegisterDetails.email
      }

     if(this.paymentEvents.length == 0){
      this.registrationService.createUser(this.formdata.RegisterDetails).subscribe(data=>{
        this.loader1.dismiss()
          console.log(data)
  
        this.navCtrl.setRoot("ThankyouPage",{type:'reg'});
  
       })
     }
     else{
         this.loader1.dismiss()
         this.navCtrl.push("CheckoutPage",{ update:false,orderdata:this.formdata.RegisterDetails})

     }
    // }else{
    //   this.loader1.dismiss()
    //   this.displayeveterroer = true
    // }
  }

  Next(){

    console.log(this.formdata.RegisterDetails.RegisterDetails)
    console.log(this.teamReg)
    console.log(this.eventDetails)
    //if(this.RegisterTeam)
    console.log(this.formdata.RegisterDetails.RegisterDetails.TotalEventsList)
    this.formdata.RegisterDetails.RegisterDetails.teamReg = this.teamReg
    if(this.teamReg.length == 0){
      this.formdata.RegisterDetails.RegisterDetails.TeamCheck = false
    }else{
     this.formdata.RegisterDetails.RegisterDetails.TeamCheck = true
    }
    for (let i = 0; i < this.eventDetails.length; i++) {
      this.QRevnt.push(this.eventDetails[i].title)
      this.formdata.RegisterDetails.RegisterDetails.QREvents.push(this.eventDetails[i].title)
      if (this.eventDetails[i].paymentGateway == true) {
        this.formdata.RegisterDetails.RegisterDetails.paymentEvents.push(this.eventDetails[i])
      }

      let QrcodeObj = {
          EventId: this.eventDetails[i]._id,
          EventName: this.eventDetails[i].title,
          QREventScan: false
      }


      this.formdata.RegisterDetails.RegisterDetails.TotalEventsList.push(QrcodeObj)
    }

    if(this.formdata.RegisterDetails.RegisterDetails.TotalEventsList.length !==0){
      if(this.representingTeam !== undefined){
        this.representingTeamErrerMessage = false
         this.formdata.RegisterDetails.RegisterDetails.representingTeam = this.representingTeam
   
        this.navCtrl.push("Register5Page",{orderdata:this.formdata.RegisterDetails.RegisterDetails})

      }else{
          this.representingTeamErrerMessage = true
      }
    }else{
      this.navCtrl.push("Register5Page",{orderdata:this.formdata.RegisterDetails.RegisterDetails})
    }
    
  }


}
