import { Component } from '@angular/core';
import {NavController,LoadingController, AlertController} from '@ionic/angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {PatientPagePage} from '../patient-page/patient-page.page'
import { Router,NavigationExtras  } from '@angular/router';
import {LoginService} from './home.service'

import { CallNumber } from '@ionic-native/call-number/ngx';

import { BarcodeScanner , BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [LoginService,CallNumber] 
})
export class HomePage {

  ngxQrcode2 = 'https://www.npmjs.com/package/ngx-qrcode2';
  techiediaries = 'https://www.npmjs.com/~techiediaries';
  letsboot = 'https://www.letsboot.com/';


  encodedData:any
  encodeData:any

  user: FormGroup;
   //loading:boolean = false
   showerrermessage:boolean=false
   barcodeScannerOptions: BarcodeScannerOptions;
   data:any= {}
   data1:any
   displaydata:boolean = false

   text:any
   name:any
   mobile:any
   gender:any
   DOB:any
   usertype:any

    Qrcodestring:string
    Qrcodestring1:any
  
  //  value:any="sdnksnfksld"

  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';


  orders: any[] = [];
  featured: any[] = [];
  Categorys:any[]=[]; 
  selectedItem:any
  Eventdata:any[]=[]
  noOfItems:any=0
  userid:any
  UserwishList:any[]=[]
  AppIcon:any
  date:any
  header:any
  buttonWhite:any
  settingdata:any
  categorydata:any=[]
  pdf:any
  UserDetails:any={}
  loader:any

  isLoading = false;
  loading: any;
  
  constructor(  public fb: FormBuilder,public navCtrl: NavController, private barcodeScanner: BarcodeScanner,
    public loadingController: LoadingController,private activatedRoute: ActivatedRoute,private callNumber: CallNumber,
     private router: Router,public loginservice:LoginService,public alertController: AlertController) {
      this.barcodeScannerOptions = {
        prompt:'Scan Qrcode',
        showTorchButton: true,
        showFlipCameraButton: true
      };
      }

     
     async showloader(){
        this.loader = await this.loadingController.create({
          message:"Please wait.."
        })
         this.loader.present()
      }


  ngOnInit(): any {

    //this.loading.present();
    this.showloader()
    
  this.loginservice.getCategory()
      .subscribe(orders => {
          this.Categorys= orders;
          this.selectedItem = this.Categorys[0]
          this.displayevents(this.Categorys[0])
          console.log(this.Categorys)
          //this.loader.dismiss();
      },error=>{
         // this.loader.dismiss();
      })

  
}




displayevents(category:any){

  // alert("get evetn")
  console.log(category)
  console.log(category._id)
  //this.loader.dismiss()
  //this.showloader()
  this.loginservice.GettingEventId(category._id).subscribe(data=>{
    
     // this.loader.dismiss();
    //  if(this.UserDetails !== null){
    //       for(let j=0;j<data.length;j++){
    //           data[j]["inwishlist"] = false
    //           for(let i=0;i<this.UserDetails.TotalEventsList.length;i++){
             
    //           if(this.UserDetails.TotalEventsList[i].EventId == data[j]._id){
    //               data[j].inwishlist = true
    //           }
    //       }

    //   }
    //   }

      // if(this.UserwishList.length != 0){
      //     for(let i=0;i<data.length;i++){
      //         console.log()
      //         data[i]["inwishlist"] = false
      //      for(let j=0;j<this.UserwishList.length;j++){
      //        // console.log(this.UserwishList[j].eventId._id)
      //          if(data[i]._id == this.UserwishList[j].eventId._id){
      //              console.log(data[i]._id)
      //              console.log(this.UserwishList[j].eventId._id)
      //             data[i].inwishlist = true
      //          }
      //      }
              
      //     }
      // }
      this.Eventdata = data
      this.loader.dismiss()
     // this.isLoading = false
      for(let i=0;i<this.Eventdata.length;i++){
          console.log(this.Eventdata[i].startTime)
          if(this.Eventdata[i].startTime != undefined){
              let hour = (this.Eventdata[i].startTime.split(':'))[0]
                 let min = (this.Eventdata[i].startTime.split(':'))[1]
                 let hour1 = +(this.Eventdata[i].startTime.split(':'))[0]
                 let part = +hour > 12 ? 'PM' : 'AM';
                 min = (min+'').length == 1 ? `0${min}` : min;
                 hour1 = +hour > 12 ? +hour - 12 : +hour;
                // console.log("hours",hour1)
                 let time2 = `${hour1}:${min} ${part}`
                // console.log("///")
                 //console.log(time2)
                 this.Eventdata[i].startTime = time2  
          }
          if(this.Eventdata[i].endTime != undefined){
              let hour = (this.Eventdata[i].endTime.split(':'))[0]
                 let min = (this.Eventdata[i].endTime.split(':'))[1]
                 let hour1 = +(this.Eventdata[i].endTime.split(':'))[0]
                 let part = +hour > 12 ? 'PM' : 'AM ';
                 min = (min+'').length == 1 ? `0${min}` : min;
                 hour1 = +hour > 12 ? +hour - 12 : +hour;
                // console.log("hours",hour1)
                 let time2 = `${hour1}:${min} ${part}`
                 //console.log("///")
                 //console.log(time2)
                 this.Eventdata[i].endTime = time2  
          }
         
           
          //  if(Eventdata[i] == "CheckInTime"){
          //    let hour = (obj.value.split(':'))[0]
          //    let min = (obj.value.split(':'))[1]
          //    let hour1 = +(obj.value.split(':'))[0]
          //    let part = +hour > 12 ? 'pm' : 'am';
          //    min = (min+'').length == 1 ? `0${min}` : min;
          //    hour1 = +hour > 12 ? +hour - 12 : +hour;
          //    console.log("hours",hour1)
          //    let time2 = `${hour1}:${min} ${part}`
          //    console.log("///")
          //    console.log(time2)
          //    obj.value = time2

          //  }
          //  if(obj.key == "CheckOutTime"){
          //    let hour = (obj.value.split(':'))[0]
          //    let min = (obj.value.split(':'))[1]
          //    let hour1 = +(obj.value.split(':'))[0]
          //    let part = +hour > 12 ? 'pm' : 'am';
          //    min = (min+'').length == 1 ? `0${min}` : min;
          //    hour1 = +hour > 12 ? +hour - 12 : +hour;
          //    console.log("hours",hour1)
          //    let time2 = `${hour1}:${min} ${part}`
          //    console.log("///")
          //    console.log(time2)
          //    obj.value = time2

          //  }
          //  this.displaydata.push(obj)
        
       }

      console.log(this.Eventdata)

  })
}

listClick(event, newValue) {
  console.log(newValue);
  this.selectedItem = newValue;  // don't forget to update the model here
  // ... do other stuff here ...
  this.displayevents(newValue)
}



async presentAlertConfirm() {
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: 'Do you what to select this event?',
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
          this.router.navigate(['/detailspage'])
        }
      }
    ]
  });

  await alert.present();
}


scan(event){

   console.log(event)
   localStorage.setItem('Event', JSON.stringify(event));
   this.presentAlertConfirm()
  
   // this.router.navigate(['/detailspage'])

}


startscanning(){
  
     this.data = {}
     this.displaydata = false
    this.barcodeScanner.scan().then(Data => {
      console.log(' data', Data);
      this.displaydata = true
       console.log(Data)
       this.Qrcodestring = Data.text
       console.log(this.Qrcodestring)
       this.data = JSON.parse(Data.text)
       this.usertype =  this.data.type
       this.Qrcodestring1 = delete this.Qrcodestring["profileImg"];
     console.log(this.Qrcodestring1)
     
  
     }).catch(err => {
         console.log('Error', err);
        
     });
  
  }

 


}
