import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferPage } from './offer';
import { TranslaterModule } from '../../app/translate.module';
import { Ng2ImgMaxModule } from 'ng2-img-max';


@NgModule({
  declarations: [
    OfferPage
  ],
  imports: [
    Ng2ImgMaxModule,
    IonicPageModule.forChild(OfferPage),
    TranslaterModule
    
  ],
  exports: [
    OfferPage
  ]
})
export class OfferPageModule {}