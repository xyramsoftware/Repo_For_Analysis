import { Component, HostBinding, OnInit } from '@angular/core';
import { SocketSharedService }from './SocketShare.service';
import { Router } from '@angular/router';
import {LoginService} from './routes/pages/login/login.service';

declare var $: any;

import { SettingsService } from './core/settings/settings.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [LoginService]
})
export class AppComponent implements OnInit {

    @HostBinding('class.layout-fixed') get isFixed() { return this.settings.layout.isFixed; };
    @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.layout.isCollapsed; };
    @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.layout.isBoxed; };
    @HostBinding('class.layout-fs') get useFullLayout() { return this.settings.layout.useFullLayout; };
    @HostBinding('class.hidden-footer') get hiddenFooter() { return this.settings.layout.hiddenFooter; };
    @HostBinding('class.layout-h') get horizontal() { return this.settings.layout.horizontal; };
    @HostBinding('class.aside-float') get isFloat() { return this.settings.layout.isFloat; };
    @HostBinding('class.offsidebar-open') get offsidebarOpen() { return this.settings.layout.offsidebarOpen; };
    @HostBinding('class.aside-toggled') get asideToggled() { return this.settings.layout.asideToggled; };
    @HostBinding('class.aside-collapsed-text') get isCollapsedText() { return this.settings.layout.isCollapsedText; };

    constructor(private loginService:LoginService,public settings: SettingsService,public socketSharedService: SocketSharedService,private router:Router) { 
              if(localStorage.getItem('token')){
                  this.loginService.adminData().subscribe((res)=>{
                  let id =  res._id;
                  if(id){
                  this.socketSharedService.userInfo(id);
                  //console.log("id is "+id);
                 }
                },(error)=>{
                   localStorage.clear();
                   //console.log("error");
                   this.router.navigate(['login']);
                })
               }
             else{
               this.router.navigate(['login']);
              }
            }

    /*
    if(isToken){
        this.loginService.adminData().subscribe((res)=>{
          this.router.navigate(['home']) ;
        },(error)=>{
          localStorage.clear();
        })
      }
    */

    ngOnInit() {
        $(document).on('click', '[href="#"]', e => e.preventDefault());

         var OneSignal= window['OneSignal'] || [];
        OneSignal.push(["init",{
          appId:"dea7356d-3be8-4eab-a62b-2e9c2f458c75",
          autoRegister:true,
          subdomainName:'https://restwebapi.onesignal.com',
          httpPermissionRequest: {
           enable: true
          },
          notifyButton:{
            enable:true
          }
          
        }]);

       OneSignal.push(function(){
         OneSignal.getUserId().then(function(userId){
           if(userId == null){
            
           }else{
             
             localStorage.setItem('playerId',userId);
           }
         });
       });    
    }
}
