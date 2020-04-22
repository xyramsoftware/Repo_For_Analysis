import {Component} from '@angular/core';
import {NavController, IonicPage,LoadingController, AlertController} from 'ionic-angular';
import {OrdersService} from './orders.service';
import {ToastController} from 'ionic-angular';

import {ConstService} from "../../providers/const-service";

import {RegistrationService} from '../registration/registration.service'

@IonicPage()
@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html',
    providers: [OrdersService,RegistrationService]
})
export class OrdersPage {
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
    constructor(public navCtrl: NavController,
                public toastCtrl: ToastController,
                private loadingCtrl:LoadingController,
                public alertCtrl: AlertController,
                public constService:ConstService,
                public registrationService: RegistrationService,
                private orderService: OrdersService) {

                    this.UserDetails = JSON.parse(localStorage.getItem('userdetails'));
                    console.log(this.UserDetails)
                    // this.settingdata = JSON.parse(localStorage.getItem('headercolor'));
                    // this.header = { 'background-color': this.settingdata.headercolor, 'color': 'white' };
                    // this.buttonWhite = { 'color': 'white' };
                    // let Image = JSON.parse(localStorage.getItem('headerIcon'));
                    // console.log(Image)
                    // if(Image !== null){
                    //   this.AppIcon = Image[0]
                      
                    // }else{
                    //   this.AppIcon = "assets/img/xyram.png"
                     
                    // }
    }
    

    ionViewWillEnter(){
      //  this.getcategoryData()
        console.log("ionview")
        if(localStorage.getItem('user')){
            console.log("user is there")
        this.userid= localStorage.getItem('user')
        //this.GetUserWishlist(this.userid)
        }else{
            console.log("user is  not there")
           
        }

         this.loader = this.loadingCtrl.create({
            content:'please wait'
        })
        this.loader.present();
        this.orderService.getCategory()
            .subscribe(orders => {
                this.Categorys= orders;
                this.selectedItem = this.Categorys[0]
                this.displayevents(this.Categorys[0])
                console.log(this.Categorys)
                //this.loader.dismiss();
            },error=>{
                this.loader.dismiss();
            })
    }

    getcategoryData(){
        this.registrationService.GetAllcategory().subscribe(data=>{
            console.log(data)
            this.categorydata = data
            for(let i=0;i<this.categorydata.length;i++){
                 this.categorydata[0]['thumb']='assets/img/carousel_2.jpg'
                 this.categorydata[1]['thumb']='assets/img/carousel_1.jpg'
            }
        })
    }

    ngOnInit() {

        
            // Get the container element

    }
     
    GetUserWishlist(id:any){
        //alert("get user wish list")
        this.orderService.GettingwishlistbyUserid(id).subscribe(data=>{
            console.log("user wish list")
            console.log(data)
            this.UserwishList= data
            this.noOfItems = this.UserwishList.length
            console.log(this.UserwishList)
        })

    }

 
    displayevents(category:any){

        // alert("get evetn")
        console.log(category)
        console.log(category._id)
        this.orderService.GettingEventId(category._id).subscribe(data=>{
            this.loader.dismiss();
           if(this.UserDetails !== null){
                for(let j=0;j<data.length;j++){
                    data[j]["inwishlist"] = false
                    for(let i=0;i<this.UserDetails.TotalEventsList.length;i++){
                   
                    if(this.UserDetails.TotalEventsList[i].EventId == data[j]._id){
                        data[j].inwishlist = true
                    }
                }

            }
            }

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
            for(let i=0;i<this.Eventdata.length;i++){
                console.log(this.Eventdata[i].startTime)
                if(this.Eventdata[i].startTime != undefined){
                    let hour = (this.Eventdata[i].startTime.split(':'))[0]
                       let min = (this.Eventdata[i].startTime.split(':'))[1]
                       let hour1 = +(this.Eventdata[i].startTime.split(':'))[0]
                       let part = +hour > 12 ? 'PM' : 'AM';
                       min = (min+'').length == 1 ? `0${min}` : min;
                       hour1 = +hour > 12 ? +hour - 12 : +hour;
                       console.log("hours",hour1)
                       let time2 = `${hour1}:${min} ${part}`
                       console.log("///")
                       console.log(time2)
                       this.Eventdata[i].startTime = time2  
                }
                if(this.Eventdata[i].endTime != undefined){
                    let hour = (this.Eventdata[i].endTime.split(':'))[0]
                       let min = (this.Eventdata[i].endTime.split(':'))[1]
                       let hour1 = +(this.Eventdata[i].endTime.split(':'))[0]
                       let part = +hour > 12 ? 'PM' : 'AM ';
                       min = (min+'').length == 1 ? `0${min}` : min;
                       hour1 = +hour > 12 ? +hour - 12 : +hour;
                       console.log("hours",hour1)
                       let time2 = `${hour1}:${min} ${part}`
                       console.log("///")
                       console.log(time2)
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
     
    orderDetails(orderId) {
        this.navCtrl.push("OrderDetailsPage", {
            orderId: orderId
        });
    }

    navcart(){
        this.navCtrl.push("CartPage");
    }

    isOrder(): boolean {
        return this.orders.length == 0 ? false : true;
    }

    listClick(event, newValue) {
        console.log(newValue);
        this.selectedItem = newValue;  // don't forget to update the model here
        // ... do other stuff here ...
        this.displayevents(newValue)
    }
    displayToast(message, duration) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
      }
      presentConfirm(userid:any,eventid:any,category:any,date:any) {
        let alert = this.alertCtrl.create({
          title: 'Remove',
          message: 'Do you want to remove from  wishlist?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
              
              }
            },
            {
              text: 'Remove',
              handler: () => {
               
                 console.log(userid)
                 console.log(eventid)
                 this.orderService.deletewishlistByUserId(userid,eventid).subscribe(data=>{
                     console.log(data)
                   
                     this.GetUserWishlist(userid)
                     console.log(category)
                    
                     this.displayevents(date)
                 })
              }
            }
          ]
        });
        alert.present();
      }

    wishlist(event:any){
        console.log(event._id)
        console.log(event)
        console.log(this.Categorys)
        if(localStorage.getItem('token')){
            for(let i=0;i<this.Categorys.length;i++){
                if(this.Categorys[i]._id == event.EventDateID){
                   this.date = this.Categorys[i] 
                   console.log("event date")
                   console.log()
                }
            }
            this.userid= localStorage.getItem('user')
            var index = this.UserwishList.findIndex(items => items.eventId._id === event._id);
            if(index> -1){
               console.log("item is there") 
               //this.displayToast('Event is already added to wishlist ', 2000); 
               this.presentConfirm(this.userid,event._id,event,this.date)
               }else{
                    console.log(" no item so push")
                    const body =  {
                        "userId":this.userid,
                        "eventId":event._id
                    }
                     console.log(body)
                    this.orderService.wishListPost(body).subscribe(data=>{
                        console.log(data)
                        event.inwishlist = true
                         this.displayToast('Event added to wishlist ', 2000); 
                        this.GetUserWishlist(this.userid)
                    })
                }    
        }else{
            console.log("token is  no there")
            this.navCtrl.setRoot("LoginPage");

        } 
    }
    displaywishlist(){

       this.navCtrl.push("WishlistPage")    

    }


    navigate(id:any,title:any){

        console.log(id)
        console.log(title)

        this.navCtrl.push("OrderDetailsPage",{CatId:id,CatTilte:title})  
    }

    ViewPdf(event:any){

          console.log(event)
       // this.pdf= this.constService.base_url+"/api/events/download/"+event._id+"?id="+event._id+"&eventspdf="+event.eventspdf
        //this.navCtrl.push("PdfPage",{PDF: this.pdf});
        this.navCtrl.push("PdfPage",{eventdata:event})
    }

    isLogin() {
        return localStorage.getItem('token') != null 
    }
}
