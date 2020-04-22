import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component'
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { RegistrationComponent } from './registration/registration.component';
import { EventsComponent } from './events/events.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AccompanyReg } from './registration/accompany-reg/accompany-reg.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ProfileComponent } from './profile/profile.component';
import { ReferFriendComponent } from './refer-friend/refer-friend.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { OAuthHandlerComponent } from './o-auth-handler/o-auth-handler.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import {AccompanySuccessComponent} from './accompany-success/accompany-success.component'
import { UpdateSuccesComponent } from './update-succes/update-succes.component';
import { EventFeedbackComponent} from './event-feedback/event-feedback.component';
import { FeedbackThankyouComponent } from './feedback-thankyou/feedback-thankyou.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "events", component: EventsComponent },
  { path: "registration", component: RegistrationComponent },
  { path: 'accompany-reg', component: AccompanyReg },
  { path: "gallery", component: GalleryComponent },
  { path: "admin", component: AdminComponent },
  { path: "login", component: LoginComponent },
  { path: "feedback", component: FeedbackComponent },
  { path: "thank-you", component: ThankYouComponent },
  { path: "profile", component: ProfileComponent },
  { path: "refer-friend", component: ReferFriendComponent},
  { path: "payment-gateway", component: PaymentGatewayComponent},
  { path: "latestnews", component: LatestNewsComponent },
  { path: "redirect", pathMatch: 'prefix', component: OAuthHandlerComponent },
  { path:"update-event", component:UpdateEventComponent},
  {path:"update-succes",component:UpdateSuccesComponent},
  {path:"accompanysuccess",component:AccompanySuccessComponent},
  {path:"event-feedback",component:EventFeedbackComponent},
  {path:"feedback-thankyou",component:FeedbackThankyouComponent},
  {path:"upload", component:UploadFileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollOffset: [0, 64], useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
