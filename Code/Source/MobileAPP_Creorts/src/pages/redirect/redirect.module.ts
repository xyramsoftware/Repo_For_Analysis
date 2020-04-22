import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RedirectPage } from './redirect';
import { RedirectService } from './redirect.service';

@NgModule({
  declarations: [
    RedirectPage,
  ],
  imports: [
    IonicPageModule.forChild(RedirectPage),
  ],
  providers: [RedirectService]
})
export class RedirectPageModule {}
