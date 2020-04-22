import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MyApp} from './app.component';
import {Service} from '../app/service';
import {IonicStorageModule} from '@ionic/storage';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate/ng2-translate';
import {Http, HttpModule} from '@angular/http';
import {BrowserModule} from "@angular/platform-browser";
import {ConstService } from '../providers/const-service';
import {UserService } from '../providers/user-service';
import {SocketService } from '../providers/socket-service';
import { HeaderColor } from '@ionic-native/header-color/ngx';
import {OrderStatusPageModule} from '../pages/order-status/order-status.module'

//import { PdfViewerModule } from 'ng2-pdf-viewer';
import {PdfPageModule} from '../pages/pdf/pdf.module'
import { Register5PageModule } from '../pages/register5/register5.module';
import { RedirectPageModule } from '../pages/redirect/redirect.module';



export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        BrowserModule,
        HttpModule,
        OrderStatusPageModule,
        Register5PageModule,
        RedirectPageModule,
        //PdfViewerModule,
        PdfPageModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [Http]
        })


    ],
    exports: [BrowserModule, HttpModule, PdfPageModule, TranslateModule,Register5PageModule,RedirectPageModule],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        Service,
        StatusBar,
        SplashScreen,
        ConstService,
        SocketService,
        UserService,
        HeaderColor
        
    ]
})
export class AppModule {
}
