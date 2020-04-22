import { Component, OnInit } from '@angular/core';
import {NavController,LoadingController, AlertController} from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { BarcodeScanner , BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';
import { LoginService } from '../home/home.service';
import { Router,NavigationExtras  } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
//import { S_IFDIR } from 'constants';

@Component({
  selector: 'app-detailspage',
  templateUrl: './detailspage.page.html',
  styleUrls: ['./detailspage.page.scss'],
  providers:[CallNumber,LoginService]
})
export class DetailspagePage implements OnInit {

  event:any={}
  phonenumber:any
  data:any
  showerrermessage:boolean=false
   barcodeScannerOptions: BarcodeScannerOptions;
  
   data1:any
   displaydata:boolean = false
   Qrcodestring:string
   Qrcodestring1:any
   usertype:any
   userdata:any={}
   checkin:boolean = false
   displaymessage:boolean = false
   loader:any
   noeventselected:boolean = false

   Teamdisplaymessage:boolean = false
   Teamcheckin:boolean = false

   Acccheckin:boolean = false
   Accdisplaymessage:boolean =false

   Spectatorceckin:boolean = false 
   Spectatordisplaymessage:boolean = false

   ticketScan:boolean = false
   TeamMemberEvent:boolean = false
   ticketsdisplaymessage:boolean = false
   ticketdata:any={}
 
  constructor(public alertController: AlertController,private router: Router,private callNumber: CallNumber, public loadingController: LoadingController,private barcodeScanner: BarcodeScanner,public loginservice:LoginService) { }


  async showloader(){
    this.loader = await this.loadingController.create({
      message:"Please wait.."
    })
     this.loader.present()
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do you what to leave this event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigate(['/home'])
          }
        }
      ]
    });
  
    await alert.present();
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.event = JSON.parse(localStorage.getItem('Event'));
    console.log(this.event)
    //this.phonenumber = this.PatientData.phonenumber

  }

//   callUs() {
//     console.log("call")
//     console.log(this.PatientData.phone)
//     this.callNumber.callNumber(this.PatientData.phone, true)
//   .then(() => console.log('Launched dialer!'))
//   .catch(() => console.log('Error launching dialer'));
// }


backbutton(){
 // alert("back")
 //// this.router.navigate(['/home'])
 this.presentAlertConfirm()
}




ionViewCanLeave(){
  alert("back")
}
startscanning(){
  
  this.checkin= false
  this.displaymessage= false
 
  this.noeventselected =  false

  this.Teamdisplaymessage = false
  this.Teamcheckin= false
  this.Acccheckin = false
  this.Accdisplaymessage = false
  this.Spectatorceckin = false
  this.Spectatordisplaymessage = false

  this.TeamMemberEvent = false
  this.ticketScan  = false

  this.ticketsdisplaymessage = false


  this.data = {}
  this.displaydata = false
 this.barcodeScanner.scan().then(Data => {
   //console.log(' data', Data);
   this.displaydata = true
    //console.log(Data)
    this.Qrcodestring = Data.text
   // console.log(this.Qrcodestring)
    this.data = JSON.parse(Data.text)
    console.log(this.data)
    if(this.data.T =='U'){
      this.showloader()
       this.loginservice.getUserdetails(this.data.RegisterId).subscribe(data=>{
         console.log(data)
         this.userdata = data
         this.loader.dismiss()
         if(this.userdata.TotalEventsList.length !==0){
          for(let i=0;i<this.userdata.TotalEventsList.length;i++){
            if(this.event._id == this.userdata.TotalEventsList[i].EventId){
               if(this.userdata.TotalEventsList[i].QREventScan == false){
                this.userdata.TotalEventsList[i].QREventScan = true
                this.loginservice.updateUser(this.data.RegisterId,this.userdata).subscribe(data=>{
                  console.log(data)
                  
                  this.checkin = true
                  this.displaymessage = false

                  let CountObj={
                    type:'userCount'
                  }
                  this.loginservice.updateCount(this.event._id,CountObj).subscribe(data=>{
                 console.log(data)
                  })  
                })
               }else{
                this.checkin = false
                this.displaymessage = true
                 
               }
            }
            
          }
          var index = this.userdata.TotalEventsList.findIndex(item => item.EventId === this.event._id);
          if (index > -1) {

            console.log(" event not in list ")
            this.noeventselected = false
          } else {
              console.log("is   there")
              this.noeventselected = true
             

          } 
        }else{

            for(let j=0;j<this.userdata.SpectatorEventList.length;j++){
              if(this.event._id == this.userdata.SpectatorEventList[j].EventId){
                if(this.userdata.SpectatorEventList[j].QRScanCheck == false){
                  this.userdata.SpectatorEventList[j].QRScanCheck = true
                  this.loginservice.updateUser(this.data.RegisterId,this.userdata).subscribe(data=>{
             
                    this.Spectatorceckin = true
                    this.Spectatordisplaymessage = false
                    let CountObj={
                      type:'userCount'
                    }
                    this.loginservice.updateCount(this.event._id,CountObj).subscribe(data=>{
                   console.log(data)
                    }) 
      
                  })

                }else{
                  this.Spectatorceckin = false
                  this.Spectatordisplaymessage = true
                }
              }
            }



          // if(this.userdata.ScanCheck == false){
          //   this.userdata.ScanCheck = true
          //   this.loginservice.updateUser(this.data.RegisterId,this.userdata).subscribe(data=>{
             
          //     this.Spectatorceckin = true
          //     this.Spectatordisplaymessage = false
          //     let CountObj={
          //       type:'visitorsCount'
          //     }
          //     this.loginservice.updateCount(this.event._id,CountObj).subscribe(data=>{
          //    console.log(data)
          //     }) 

          //   })
            
          // }else{

          //   this.Spectatorceckin = false
          //   this.Spectatordisplaymessage = true

          // }
         
          
        }       
       })
       
    }
    if(this.data.T =='TR'){
      this.showloader()
      this.loginservice.getTMdetails(this.data.TeamMemberId).subscribe(data=>{

         console.log("team member data")
         console.log(data)
         this.loader.dismiss()
         for(let i=0;i<data.AllTeamImages.length;i++){
           if(this.data.TeamMemberId == data.AllTeamImages[i].TeamMemberId){
             if(this.event._id == data.AllTeamImages[i].EventID){
              if(data.AllTeamImages[i].ScanTeamCheck == false){
                data.AllTeamImages[i].ScanTeamCheck = true
                this.loginservice.updateTeamMember(this.data.TeamMemberId,data).subscribe(data=>{
                  console.log(data)
                  
                  this.Teamcheckin = true
                  this.Teamdisplaymessage = false
                  let CountObj={
                    type:'teamMemberCount'
                  }
                  this.loginservice.updateCount(this.event._id,CountObj).subscribe(data=>{
                 console.log(data)
                  })
                  
                })
  
               }else{
  
                this.Teamcheckin = false
                this.Teamdisplaymessage = true
  
               }

              }else{

                this.TeamMemberEvent = true

              }
            
           }
         }
      })

    } 
    if(this.data.T == 'T'){

      this.showloader()
      this.loginservice.getTicketsData(this.data.Id).subscribe(data=>{
        console.log(data.response)

        this.ticketdata = data.response

        for(let i=0;i<this.ticketdata.events.length;i++){
          if(this.event._id == this.ticketdata.events[i].eventId ){
             if(this.ticketdata.events[i].qrscanCheck == false){
              this.ticketdata.events[i].qrscanCheck = true
              // let Obj = {
              //   response : this.ticketdata
              // }
              this.loginservice.updateTickets(this.ticketdata).subscribe(data=>{
                console.log(data)
                this.loader.dismiss()
                let CountObj={
                  type:'ticketsCount'
                }
                this.loginservice.updateCount(this.event._id,CountObj).subscribe(data=>{
               console.log(data)
                })
                this.ticketScan  = true
                this.ticketsdisplaymessage = false
              })
             }else{
              this.loader.dismiss()
              this.ticketScan  = false
              this.ticketsdisplaymessage = true
             }

          }
        }
        
      })
        


    }

      if(this.data.T == 'A'){
        this.showloader()
        this.loginservice.getAccompanyDetails(this.data.RegisterId).subscribe(data=>{
          console.log(data)
          this.loader.dismiss()

          for(let i=0;i<data.AccompanyEventList.length;i++){
            if(this.event._id == data.AccompanyEventList[i].EventId){
              if(data.AccompanyEventList[i].QRScanCheck  == false){
                data.AccompanyEventList[i].QRScanCheck  = true
                this.loginservice.updateAccompany(this.data.RegisterId,data).subscribe(data=>{
                  console.log(data)
                  this.Acccheckin = true
                  this.Accdisplaymessage = false
                  let CountObj={
                    type:'accompanyCount'
                  }
                  this.loginservice.updateCount(this.event._id,CountObj).subscribe(data=>{
                 console.log(data)
                  })
                })
              }else{
                this.Acccheckin = false 
                this.Accdisplaymessage = true
              }
            }
          }

          // var index = data.AccompanyEventList.findIndex(item => item.EventId === this.event._id);
          // if (index > -1) {

          //   console.log(" event not in list ")
          
          
          // } else {
          //     console.log("is   there")
          //     // console.log(item)
          // } 

          // if(data.QRScanCheck == false){
          //   data.QRScanCheck = true
          //   this.loginservice.updateAccompany(this.data.RegisterId,data).subscribe(data=>{
          //     console.log(data)
          //     this.Acccheckin = true
          //     this.Accdisplaymessage = false
          //     let CountObj={
          //       type:'accompanyCount'
          //     }
          //     this.loginservice.updateCount(this.event._id,CountObj).subscribe(data=>{
          //    console.log(data)
          //     })
          //   })
            

          // }else{
          //    this.Acccheckin = false 
          //     this.Accdisplaymessage = true

          // }
        })

      }
    
    //this.usertype =  this.data.type
    //this.Qrcodestring1 = delete this.Qrcodestring["profileImg"];
  //console.log(this.Qrcodestring1)
  

  }).catch(err => {
      console.log('Error', err);
     
  });

}


}
