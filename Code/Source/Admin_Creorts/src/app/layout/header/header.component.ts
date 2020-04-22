import { Component, OnInit, ViewChild } from '@angular/core';
import { NavBarService } from './navbar.service';
import { SocketSharedService }from '../../SocketShare.service';
const screenfull = require('screenfull');
const browser = require('jquery.browser');
declare var $: any;

import { UserblockService } from '../sidebar/userblock/userblock.service';
import { SettingsService } from '../../core/settings/settings.service';
import { MenuService } from '../../core/menu/menu.service';
import { Router} from '@angular/router';

import {ToastrService} from 'toastr-ng2';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [NavBarService]
})
export class HeaderComponent implements OnInit {
  bgColor: string;
  bgimgae:any
  headerIcon:string 
    navCollapsed = true; // for horizontal layout
    menuItems = []; // for horizontal layout

    isNavSearchVisible: boolean;

   orderdata:any=[]
    orderNotify:any=[];
    unread:any = 0;
    unreadMsgCount:number = 0;
    chatNotification:any = [];
     notification:any=[]
     shownotification:boolean = false
     image1:any = "rgb(245, 154, 31)"
    @ViewChild('fsbutton') fsbutton;  // the fullscreen button

    constructor(private sockectService:SocketSharedService,
                private restService:NavBarService, 
                private router:Router, 
                public menu: MenuService,
                public toastr: ToastrService,
                public userblockService: UserblockService, 
                public settings: SettingsService) {
                  this.headerIcon = "assets/img/logocts.jpeg"
                  this.bgColor = "bisque"
                  this.bgimgae = "linear-gradient(to right, "+this.image1+" 0%, "+this.image1+" 100%)"
                    // this.restService.getOrdersData().subscribe(orderdata=>{
                    //     this.orderdata = orderdata
                    //     console.log("constructor")
                    //     console.log(this.orderdata)
                    //    })
             console.log( this.headerIcon)

        // show only a few items on demo
        this.menuItems = menu.getMenu().slice(0,4); // for horizontal layout
         this.gettingcoloresettings()
       // this.getorderdata()
       // this.getUnreadNotifications();
       // this.getUnreadMsgNotification();
       // 
    }

    gettingcoloresettings(){

      //  this.restService.gettingcolore().subscribe(data=>{
      //    console.log(data)
      //    localStorage.setItem('headercolor', JSON.stringify(data));
      //    this.bgimgae = "linear-gradient(to right, "+data.headercolor+" 0%, "+data.headercolor+" 100%)"
      //  })
    // alert("color")
      let color = JSON.parse(localStorage.getItem('headercolor'));
        console.log("hrader color")
        console.log(color)
      if(color !== null) {
      // console.log(color)
       //this.bgimgae = color.headercolor
       this.bgimgae = "linear-gradient(to right, "+color.headercolor+" 0%, "+color.headercolor+" 100%)"
       console.log(this.bgimgae)
    // return true; 
      }else{
        this.bgimgae = "linear-gradient(to right, "+this.image1+" 0%, "+this.image1+" 100%)"
        this.headerIcon = "assets/img/logocts.jpeg"
      }

     

    }

    getorderdata(){
        // this.restService.getOrdersData().subscribe(orderdata=>{
        //     //console.log("//////////////////gey roder data//////////////")
        //     this.orderdata = orderdata
        //    })
    }
    getUnreadMsgNotification(){
      this.unreadMsgCount = 0;
      this.restService.getUnreadMessageNotificationData().subscribe((res:any)=>{
        //console.log("getUnreadMessageNotificationData "+JSON.stringify(res));
        this.chatNotification = res;
        let lengthMsg = this.chatNotification.length;
        for(let i=0;i<lengthMsg;i++){
         if(this.chatNotification[i].count){
          this.unreadMsgCount = this.unreadMsgCount+this.chatNotification[i].count;
          //console.log("if call");
        }
       }
       //console.log("unreadMsgNotification "+this.unreadMsgNotification);
      })
    }

    messageRead(index,userId){
      this.unreadMsgCount = this.unreadMsgCount - this.chatNotification[index].count
      //console.log("messageRead userId "+userId);
      this.restService.readUserMessage(userId).subscribe((res)=>{
        this.chatNotification[index].count = res;
       // console.log("messageRead "+JSON.stringify(res));
        this.router.navigate(['chat']);
      })
    }

    getUnreadNotifications(){
        //alert("1.Header Notification")
        this.unread = 0;
    this.restService.getUnreadNotificationData().subscribe((res)=>{
      this.orderNotify = res;
      //console.log("Notification")
      //console.log(this.orderdata)
      //console.log(this.orderNotify)
      for(let j=0;j<this.orderdata.length;j++){

        for(let i=0;i<this.orderNotify.length;i++){

            if(this.orderdata[j].orderID === this.orderNotify[i].orderID){

               // console.log(this.orderNotify[i].orderID)
                this.orderNotify[i].readNotification = true
                //break;
            }
        }

      }
      //console.log(" getUnreadNotificationData component "+JSON.stringify(this.orderNotify));
      let length = this.orderNotify.length;
     // alert("2")
      for(let i=0;i<length;i++){
        if(this.orderNotify[i].readNotification === false){
          this.unread++;
          //console.log("if call");
        }
      }
    })
  }

  readNavigate(notificationId,orderId){
   //console.log("readNavigate "+notificationId + "OrderId"+orderId);
   this.updateNotificationAndRoute(notificationId,orderId);
  }

  readNotNavigate(notificationId){
   //console.log("readNotNavigate "+notificationId);
   this.router.navigate(['order/allOrder']);
   this.updateNotification(notificationId);
  }
  
  readAllNotification(){
       this.restService.readAllNotifications().subscribe((res)=>{
           this.getUnreadNotifications();
           this.router.navigate(['order/allOrder']);
       })
       
    }

  updateNotification(notificationId){
     // alert(" 2. Header update notification")
    let notify:any = {
      readNotification : true
    }
   //console.log("notificationId "+notificationId);
   this.restService.UpdateNotificationData(notify,notificationId).subscribe((res)=>{
     this.getUnreadNotifications();
   })
  }

  updateNotificationAndRoute(notificationId,orderId){
   // alert(" 3.header update notification")
    let notify:any = {
      readNotification : true
    }
   //console.log("notificationId "+notificationId);
   this.restService.UpdateNotificationData(notify,notificationId).subscribe((res)=>{
     this.getUnreadNotifications();
   this.router.navigate(['order/viewOrder',orderId]);

   })
  }

    ngOnInit() {
       
        this.isNavSearchVisible = false;
        if (browser.msie) { // Not supported under IE
            this.fsbutton.nativeElement.style.display = 'none';
        }

        this.sockectService.getOrderNotification().subscribe((notification)=>{
            //  console.log(JSON.stringify(notification));
               var message = { 
                //  app_id: "ace5d8a2-5018-4523-ab21-cff285d32524",
                   app_id:"230d3e93-0c29-49bd-ac82-ecea8612464e",
                 contents: {"en": "A New order Arrived"},
             include_player_ids: [localStorage.getItem('playerId')]
                
          };
          //console.log("//////////////////////////////////")
        
          //console.log(this.orderdata)
          this.notification = notification
        //console.log(this.notification.orderID)
        this.shownotification=false
        for(let i=0;i<this.orderdata.length;i++){

          if( this.orderdata[i].orderID == this.notification.orderID){

            this.shownotification = true

            //console.log(this.orderdata[i].orderID)
          }
         
        }
          if(this.shownotification == false){
            // this.restService.getOrdersData().subscribe(orderdata=>{
            //     this.orderdata = orderdata
            //    })
            this.unread++;
            var data:any = notification;
            if(this.orderNotify.length == 0){
              
                this.orderNotify.unshift(data);
            }else{
  
                 let index = this.orderNotify.findIndex(x=>x._id==data._id);
             if(index >=0){
             
  
               this.orderNotify.splice(index,1)
               this.orderNotify.unshift(data);
              
             }
             else{
  
               this.orderNotify.unshift(data);
  
             }
            }
          
         
        }

        //    this.restService.sendNotification(message).subscribe(response =>{
              
        //    });
          //alert("notification 2")
             
            })

        this.sockectService.getUserNotification().subscribe((msgNotification)=>{
         // console.log("message Notification "+JSON.stringify(msgNotification));
              this.unreadMsgCount++;
             // alert("1")
              var data:any = msgNotification;
              if(this.chatNotification.length == 0){
                
                  this.chatNotification.unshift(data);
              }else{

                   let index = this.chatNotification.findIndex(x=>x._id==data._id);
               if(index >=0){
               

                 this.chatNotification.splice(index,1)
                 this.chatNotification.unshift(data)
               }
               else{
                 this.chatNotification.unshift(data);
                }
              }
        })

    }

    gotoChat(){
      this.router.navigate(['chat']);
    }

    logout(){
         //localStorage.clear();
         localStorage.removeItem('admintoken');
         localStorage.removeItem('admin_id');
         localStorage.removeItem('bearer')
         localStorage.removeItem('team');
         localStorage.removeItem('url');
         localStorage.removeItem('accompany')
         localStorage.removeItem('UserId');

        this.router.navigate(['/login']);
        this.toastr.success('Logout Successfully!');
    }

    toggleUserBlock(event) {
        event.preventDefault();
        this.userblockService.toggleVisibility();
    }

    openNavSearch(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setNavSearchVisible(true);
    }

    setNavSearchVisible(stat: boolean) {
        // console.log(stat);
        this.isNavSearchVisible = stat;
    }

    getNavSearchVisible() {
        return this.isNavSearchVisible;
    }

    toggleOffsidebar() {
        this.settings.layout.offsidebarOpen = !this.settings.layout.offsidebarOpen;
    }

    toggleCollapsedSideabar() {
        this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    }

    isCollapsedText() {
        return this.settings.layout.isCollapsedText;
    }

    toggleFullScreen(event) {

        if (screenfull.enabled) {
            screenfull.toggle();
        }
        // Switch icon indicator
        let el = $(this.fsbutton.nativeElement);
        if (screenfull.isFullscreen) {
            el.children('em').removeClass('fa-expand').addClass('fa-compress');
        }
        else {
            el.children('em').removeClass('fa-compress').addClass('fa-expand');
        }
    }

    Coloritems(){
      //console.log("header color")
      let color = JSON.parse(localStorage.getItem('headercolor'));
        
     if(color !== null) {
     // console.log(color)
      //this.bgimgae = color.headercolor
      this.bgimgae = "linear-gradient(to right, "+color[0].headercolor+" 0%, "+color[0].headercolor+" 100%)"
      //console.log(this.bgimgae)
    return true; 
     }else{
      this.bgimgae = "linear-gradient(to right, "+this.image1+" 0%, "+this.image1+" 100%)"
      return true
     }
    }

    HeaderImageSet(){
      let Image = JSON.parse(localStorage.getItem('headerIcon'));
      //console.log(Image)
      if(Image !== null){
        this.headerIcon = Image
        return true
      }else{
        this.headerIcon = "assets/img/logocts.jpeg"
        return true
      }
    }
}
