import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController, ToastController, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../providers/user-service';
import { FavouriteService } from './favourite.service';
import { OrderStatusPage } from '../order-status/order-status'


@IonicPage()
@Component({
    // changeDetection: ChangeDetectionStrategy.OnPush
    selector: 'page-favourite',
    templateUrl: 'favourite.html',
    providers: [FavouriteService]
})
export class FavouritePage {

    UserDetails: any = {}
    eventTypes: any = []
    eventsList: any = []

    categorydata: any = []

    categorydata1: any = []



    eventDetails: any = []
    events: any = {}
    SelectedEvent1: any = []
    userselectTeamEvent: any = {}
    sprtiindividulaevents: any = []
    culturaevent: any = []
    paymentEvents: any = []
    currnetEventSelectd: any = {}

    representingTeam:any
    teamReg: any = []
    sportIndividualReg: any = []
    QRevnt: any = []
    QrCodeScanItem: any = []
    loader1: any
    loader:any
    TotaleventSelected:boolean = false
    SprotIndTotaleventSelected:boolean= false
    SprotTeamTotaleventSelected:boolean = false
    SprotIndTotaleventSelected1:boolean = false
    SprotTeamTotaleventSelected1:boolean = false
    showrepresentingErrorMesage:boolean = false


    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public storage: Storage,
        private ref: ChangeDetectorRef,
        public modalCtrl: ModalController,
        public userService: UserService,
        public favouriteService: FavouriteService) {

        this.UserDetails = JSON.parse(localStorage.getItem('userdetails'));
        console.log(this.UserDetails)
        this.representingTeam = this.UserDetails.representingTeam
        this.getevetTypes()

        this.loader = this.loadingCtrl.create({
            content: 'please wait'
        })

        this.loader.present();


    }

    getevetTypes() {
        this.favouriteService.getallEventsTypes().subscribe(data => {
            console.log(data)
            this.eventTypes = data
            this.eventcategory()
        })

    }


    eventcategory() {
        this.favouriteService.GetAllcategory().subscribe(data => {

            // console.log(data)
            this.categorydata = data
            this.categorydata1 = data
            for (let i = 0; i < this.categorydata.length; i++) {
                for (let j = 0; j < this.eventTypes.length; j++) {
                    if (this.eventTypes[j].eventTypeName == 'Individual Event') {
                        this.categorydata[i]['indevidulaEvent'] = []
                        this.categorydata[i]['TeamEvent'] = []
                        this.categorydata[i]['IndividualEventType'] = this.eventTypes[j]._id
                    } else {
                        this.categorydata[i]['TeamEventType'] = this.eventTypes[j]._id
                    }
                    this.favouriteService.geteventsByEventType(this.categorydata[i]._id, this.eventTypes[j]._id).subscribe(data => {

                        if (data.length == 0) {
                            this.categorydata[i]['dipslaycontent'] = false
                        }
                        if (data.length != 0) {
                            for (let k = 0; k < data.length; k++) {
                                data[k]['checked'] = false
                                if (this.categorydata[i].IndividualEventType == data[k].EventTypeID) {

                                    var index = this.UserDetails.TotalEventsList.findIndex(item => item.EventId === data[k]._id);
                                    if (index > -1) {
                                    } else {
                                        console.log("is   there")
                                        this.categorydata[i].indevidulaEvent.push(data[k])

                                    }



                                } if (this.categorydata[i].TeamEventType == data[k].EventTypeID) {
                                    //this.categorydata[i].TeamEvent.push(data[k])
                                    var index = this.UserDetails.TotalEventsList.findIndex(item => item.EventId === data[k]._id);
                                    if (index > -1) {
                                    } else {
                                        console.log("is   there")
                                        this.categorydata[i].TeamEvent.push(data[k])

                                    }
                                    // this.categorydata[i].TeamEvent.push(data[k])
                                }

                            }
                        }
                        console.log("data based on eventy type")
                        console.log(data)
                        console.log(data.length)

                    })
                }
                this.favouriteService.GetEventsBYcategory(this.categorydata[i]._id).subscribe(data => {
                    console.log(data)
                    for (let j = 0; j < data.length; j++) {
                        data[j]['checked'] = false
                    }
                    this.categorydata1[i]['events'] = data
                })


            }

            console.log(this.categorydata)
              setTimeout(() => {
                
                this.displaytotaleventslist()

              }, 500);
           

        })
    }

    displaytotaleventslist(){
        for(let q=0;q<this.categorydata.length;q++){
            console.log(this.categorydata[q].indevidulaEvent.length)
            console.log(this.categorydata[q].TeamEvent.length)
            if(this.categorydata[q].categoryName == 'Sports'){

                if(this.categorydata[q].indevidulaEvent.length == 0){
                    this.SprotIndTotaleventSelected = true
                }else if(this.categorydata[q].TeamEvent.length == 0){
                    this.SprotTeamTotaleventSelected = true
                }else{
                    this.SprotIndTotaleventSelected = false
                    this.SprotTeamTotaleventSelected =  false
                }

            }
            if(this.categorydata[q].categoryName == 'Cultural'){
                if(this.categorydata[q].indevidulaEvent.length == 0){
                    this.SprotIndTotaleventSelected1 = true
                }else if(this.categorydata[q].TeamEvent.length == 0){
                    this.SprotTeamTotaleventSelected1 = true
                }else{
                    this.SprotIndTotaleventSelected1 = false
                    this.SprotTeamTotaleventSelected1 =  false
                }
            }

            if( this.SprotIndTotaleventSelected == true &&  this.SprotTeamTotaleventSelected == true &&  this.SprotIndTotaleventSelected1 == true && this.SprotTeamTotaleventSelected1 == true){
                this.TotaleventSelected = false
            }else{
                this.TotaleventSelected = true
            }
        }
        this.loader.dismiss()
        console.log(this.TotaleventSelected)
    }

    ngOnInit() {

    }

    navcart() {
        this.navCtrl.push("CartPage");
    }




    showAlert(message: any) {
        console.log(message)
        let alert = this.alertCtrl.create({
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    checkboxOptions(event) {
        console.log(event)
        console.log(event)
        this.currnetEventSelectd = event
        event.type = "Individual"
        if (event.checked == false) {
            event.checked = true

            if (event.paymentGateway == true) {
                //this.displayToast('This event have payment', 1500);
                this.showAlert('Its a paid event, you need to pay Rs'+event.price +'!' );
            }

              if(event.categoryName != 'Cultural'){
                this.sportIndividualReg.push(event)
              }
            
            this.eventDetails.push(event)

        } else {
            event.checked = false
            for (let i = 0; i < this.eventDetails.length; i++) {
                if (this.eventDetails[i]._id == event._id) {
                    this.eventDetails.splice(i, 1)
                }
            }

            for (let i = 0; i < this.sportIndividualReg.length; i++) {
                if (this.sportIndividualReg[i]._id == event._id) {
                    this.sportIndividualReg.splice(i, 1)
                }
            }
        }

        console.log(this.sportIndividualReg)
        console.log(this.eventDetails)
    }


    checkboxOptionsForTeam(event: any) {

        console.log("////////////////////////////")
        console.log(event)
        event.donotrepete = false
        this.currnetEventSelectd = event
        //this.currnetEventSelectd.donotrepete = false
        event.type = "TeamReg"

        //console.log(event)
        //  if(this.donotrepete == false){


        // this.donotrepete = fa

        if (event.checked == false) {
            event.checked = true

            this.eventDetails.push(event)
            this.teamReg.push(event)
            let profileModal = this.modalCtrl.create(OrderStatusPage, { eventdata: event });
            profileModal.onDidDismiss(() => {
                // Call the method to do whatever in your home.ts
                console.log('Modal closed');
                this.addingTeamDateToevent()
            });
            profileModal.present();
            // this.navCtrl.push("RegistrationThirdPage",{eventdata:event})

        } else {
            // this.donotrepete = true
            event.checked = false
            for (let i = 0; i < this.eventDetails.length; i++) {
                if (this.eventDetails[i]._id == event._id) {
                    this.eventDetails.splice(i, 1)
                    //break
                }
            }
            for (let i = 0; i < this.teamReg.length; i++) {
                if (this.teamReg[i]._id == event._id) {
                    this.teamReg.splice(i, 1)
                    // break
                }

            }
            console.log(this.teamReg)
            console.log(this.eventDetails)

        }
    }





    addingTeamDateToevent() {

        this.ref.markForCheck();
        console.log("did enter")
        //(JSON.parse(this.events))
        this.events = (JSON.parse(localStorage.getItem('Events')))
        console.log(this.events)
        if (this.events !== null) {
            console.log(this.events.checked)
            console.log(this.events.teamdetails)
            if (this.events.teamdetails == undefined) {
                this.events.checked = false
            }

            console.log(this.events)
            // console.log(this.events.eventdata)
            console.log(this.SelectedEvent1.length)
            this.SelectedEvent1.push(this.events)
            console.log(this.SelectedEvent1)

            localStorage.removeItem('Events')
        } else {
            console.log(this.currnetEventSelectd)
            console.log(this.categorydata)
           // if (this.currnetEventSelectd.checked !== undefined) {

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
            
        }


    }


    RegisterTeamUpdate() {


        this.loader1 = this.loadingCtrl.create({
            content: 'please wait'
        })

        this.loader1.present();
        this.UserDetails.representingTeam = this.representingTeam
        //  console.log(this.UserDetails)
        console.log(this.SelectedEvent1)
        console.log(this.eventDetails)
        console.log(this.sportIndividualReg)
        console.log(this.teamReg)
        console.log(this.teamReg.length)
        console.log(this.UserDetails)
       

        console.log(this.paymentEvents)
         if(this.UserDetails.paymentEvents == undefined){
                this.UserDetails.paymentEvents =[]
         }


          console.log(this.UserDetails)
        if (this.UserDetails.representingTeam == undefined) {
           if(this.sportIndividualReg.length !== 0 || this.teamReg.length !==0 ){
            this.showrepresentingErrorMesage = true
            this.loader1.dismiss()
           }else{
            this.showrepresentingErrorMesage = false
            for (let i = 0; i < this.eventDetails.length; i++) {
    
                if (this.eventDetails[i].paymentGateway == true) {
                    this.paymentEvents.push(this.eventDetails[i])
                }
    
                let QrcodeObj = {
                    EventId: this.eventDetails[i]._id,
                    EventName: this.eventDetails[i].title,
                    QREventScan: false
                }
    
                this.UserDetails.TotalEventsList.push(QrcodeObj)
                console.log(this.UserDetails.TotalEventsList)
            
               
                this.UserDetails.QREvents.push(this.eventDetails[i].title)
    
    
    
                if (this.eventDetails[i].categoryName == 'Cultural') {
                    this.UserDetails.culturalReg.push(this.eventDetails[i])
                }
                if (this.eventDetails[i].categoryName == 'Sports' && this.eventDetails[i].EventTypeName == 'Individual Event') {
                    this.UserDetails.sportIndividualReg.push(this.eventDetails[i])
                }
                if (this.eventDetails[i].categoryName == 'Sports' && this.eventDetails[i].EventTypeName == 'Team Event') {
                    this.UserDetails.teamReg.push(this.eventDetails[i])
                }
                if (this.eventDetails[i].paymentGateway == true) {
                    this.UserDetails.paymentEvents.push(this.eventDetails[i])
                }
    
    
            }
    
    
            if (this.UserDetails.emailCheck == false) {
                delete this.UserDetails.email
            }
    
            if ( this.UserDetails.teamReg.length == 0) {
                this.UserDetails.TeamCheck = false
            } else {
                this.UserDetails.TeamCheck = true
            }
    
            if (this.UserDetails.paymentEvents.length == 0) {
                this.UserDetails.representingTeam = this.representingTeam
                this.favouriteService.updateUser(this.UserDetails._id, this.UserDetails).subscribe(data => {
                    console.log(data)
                    localStorage.removeItem('userdetails')
                    setTimeout(() => {
                        localStorage.setItem('userdetails', JSON.stringify(data));
                    }, 300);
                    
                    this.loader1.dismiss()
                    this.navCtrl.setRoot("ThankyouPage", { type: 'update' });
                })
    
            } else {
                this.loader1.dismiss()
                this.UserDetails.representingTeam = this.representingTeam
                this.navCtrl.push("CheckoutPage", { update: true, orderdata: this.UserDetails })
            }

        }


           
        }else{

           
            console.log(this.eventDetails)

            for (let i = 0; i < this.eventDetails.length; i++) {
    
                if (this.eventDetails[i].paymentGateway == true) {
                    this.paymentEvents.push(this.eventDetails[i])
                }
    
                let QrcodeObj = {
                    EventId: this.eventDetails[i]._id,
                    EventName: this.eventDetails[i].title,
                    QREventScan: false
                }
    
                this.UserDetails.TotalEventsList.push(QrcodeObj)
                console.log(this.UserDetails.TotalEventsList)
            
               
                this.UserDetails.QREvents.push(this.eventDetails[i].title)
    
    
    
                if (this.eventDetails[i].categoryName == 'Cultural') {
                    this.UserDetails.culturalReg.push(this.eventDetails[i])
                }
                if (this.eventDetails[i].categoryName == 'Sports' && this.eventDetails[i].EventTypeName == 'Individual Event') {
                    this.UserDetails.sportIndividualReg.push(this.eventDetails[i])
                }
                if (this.eventDetails[i].categoryName == 'Sports' && this.eventDetails[i].EventTypeName == 'Team Event') {
                    this.UserDetails.teamReg.push(this.eventDetails[i])
                }
                if (this.eventDetails[i].paymentGateway == true) {
                    this.UserDetails.paymentEvents.push(this.eventDetails[i])
                }
    
    
            }
    
    
            if (this.UserDetails.emailCheck == false) {
                delete this.UserDetails.email
            }
    
            if ( this.UserDetails.teamReg.length == 0) {
                this.UserDetails.TeamCheck = false
            } else {
                this.UserDetails.TeamCheck = true
            }
    
            if (this.UserDetails.paymentEvents.length == 0) {
                this.UserDetails.representingTeam = this.representingTeam
                this.favouriteService.updateUser(this.UserDetails._id, this.UserDetails).subscribe(res => {
                     console.log("........... updated data................")
                    console.log(res)
                    localStorage.removeItem('userdetails')
                    setTimeout(() => {
                        localStorage.setItem('userdetails', JSON.stringify(res));
                    }, 300);
                    
                    this.loader1.dismiss()
                    this.navCtrl.setRoot("ThankyouPage", { type: 'update' });
                })
    
            } else {
                this.loader1.dismiss()
                this.UserDetails.representingTeam = this.representingTeam
                this.navCtrl.push("CheckoutPage", { update: true, orderdata: this.UserDetails })
            }

        }


       

        


      



       // console.log(this.UserDetails)

    }






}








