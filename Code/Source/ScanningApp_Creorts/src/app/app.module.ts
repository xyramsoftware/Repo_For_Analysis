import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {Http, HttpModule} from '@angular/http';

import {ConstService} from "./const.service";
import {PopoverpagePageModule} from './popoverpage/popoverpage.module'
import {PopoverpagePage} from './popoverpage/popoverpage.page'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [PopoverpagePage],
  imports: [BrowserModule, 
    HttpModule,
    PopoverpagePageModule,
    BrowserAnimationsModule, 
    IonicModule.forRoot(),
     AppRoutingModule],
    
    
  providers: [
    StatusBar,
    SplashScreen,
    ConstService,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  exports: [BrowserModule, HttpModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
 
})
export class AppModule {}
