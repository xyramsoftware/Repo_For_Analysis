import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; // this is needed!
import {NgModule} from '@angular/core';
import {HttpModule, Http} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import {AppComponent} from './app.component';

import {CoreModule} from './core/core.module';
import {LayoutModule} from './layout/layout.module';
import {SharedModule} from './shared/shared.module';
import {RoutesModule} from './routes/routes.module';
import {TimePickerModule} from './routes/restaurant/time-picker/timepicker.module'

import {FoodPickupModule} from './routes/restaurant/pickup/pickup.module'
import {ReportModule} from './routes/restaurant/reports/repotrs.module'
 
import {ToastrModule} from 'toastr-ng2';
import { CookieModule } from 'ngx-cookie';

import {ConstantService} from './constant.service';
import {SocketSharedService} from './SocketShare.service';
//import {Common} from './common'
 
import {LaddaModule} from 'angular2-ladda';
import { CKEditorModule } from 'ng2-ckeditor';
import { DatepickerModule } from 'angular2-material-datepicker'
import { AngularMultiSelectModule } from 'angular2-multiselect-checkbox-dropdown/angular2-multiselect-dropdown'

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import {ReportmodalComponent} from './routes/restaurant/OrderModal/ordermodal'
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';




export function createTranslateLoader(http: Http) {
}

@NgModule({
  declarations: [
    AppComponent,
    ReportmodalComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule, // required for ng2-tag-input
    CoreModule,
    DatepickerModule,
    LayoutModule,
    SharedModule.forRoot(),
    RoutesModule,
    ToastrModule.forRoot(),
    CookieModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    CKEditorModule,
    TimePickerModule,
    FoodPickupModule,
    ReportModule,
    AngularMultiSelectModule,
    LaddaModule.forRoot({
      style: "contract",
      spinnerSize: 30,
      spinnerColor: "red",
      spinnerLines: 12
    }),
    Ng2ChartsModule,
    
  ],
  providers: [ConstantService, SocketSharedService],
 
  bootstrap: [AppComponent],
  entryComponents: [
    ReportmodalComponent
]
})
export class AppModule {
}
