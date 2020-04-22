import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { SliderModule } from 'angular-image-slider';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md'
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AboutComponent } from './about/about.component';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { RegistrationComponent } from './registration/registration.component';
import { EventsComponent } from './events/events.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { ConfigService } from './config.service';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GalleryComponent } from './gallery/gallery.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogComponent } from '../app/registration/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { CustomDateParserFormatter } from './utils/customDateParserFormatter';
import { AccompanyReg } from './registration/accompany-reg/accompany-reg.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ProfileComponent } from './profile/profile.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccompanyProfileComponent } from './profile/accompany-profile/accompany-profile.component';
import { TeamdetailsComponent } from './profile/teamdetails/teamdetails.component';
import { MultiItemCarouselComponent } from './utils/multi-item-carousel/multi-item-carousel.component';
import { ReferFriendComponent } from './refer-friend/refer-friend.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { OAuthHandlerComponent } from './o-auth-handler/o-auth-handler.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { UpdateEventComponent } from './update-event/update-event.component';
import { UpdateSuccesComponent } from './update-succes/update-succes.component';
import { AccompanySuccessComponent } from './accompany-success/accompany-success.component';
import {MatRadioModule} from '@angular/material/radio';
import { EventFeedbackComponent } from './event-feedback/event-feedback.component';
import { ToastrModule } from 'ngx-toastr';
import { FeedbackThankyouComponent } from './feedback-thankyou/feedback-thankyou.component';

import { SocialLoginModule,AuthServiceConfig } from 'angular4-social-login';
import { GoogleLoginProvider,FacebookLoginProvider } from 'angular4-social-login';
import { UploadFileComponent } from './upload-file/upload-file.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("813464709172384")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("1072102997404-elirumiap5shkvc4dbu7dul6v73h8bs0.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    RegistrationComponent,
    EventsComponent,
    GalleryComponent,
    AdminComponent,
    LoginComponent,
    DialogComponent,
    AccompanyReg,
    FeedbackComponent,
    ThankYouComponent,
    ProfileComponent,
    TeamdetailsComponent,
    AccompanyProfileComponent,
    MultiItemCarouselComponent,
    ReferFriendComponent,
    PaymentGatewayComponent,
    LatestNewsComponent,
    OAuthHandlerComponent,
    UpdateEventComponent,
    UpdateSuccesComponent,
    AccompanySuccessComponent,
    EventFeedbackComponent,
    FeedbackThankyouComponent,
    UploadFileComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    AppRoutingModule,
    NgxPaginationModule,
    BrowserModule,
    MatGridListModule,
    MatToolbarModule,
    NgbModule, SliderModule,
    HttpModule,
    HttpClientModule,
    MatDialogModule,
    MatRadioModule,
    CarouselModule, WavesModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule, ReactiveFormsModule,
    MatCheckboxModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    SocialLoginModule,
    ToastrModule.forRoot({
      positionClass:'toast-center-center',
      closeButton:true,

    })
  ],

  providers: [ConfigService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

// , {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}