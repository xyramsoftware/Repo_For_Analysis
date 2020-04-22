import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Registraion4Page } from './registraion4';
import { ImageCropperModule } from 'ngx-image-cropper';
import { Ng2ImgMaxModule } from 'ng2-img-max';

@NgModule({
  declarations: [
    Registraion4Page,
  ],
  imports: [
    ImageCropperModule,
    Ng2ImgMaxModule,
    IonicPageModule.forChild(Registraion4Page),
  ],
})
export class Registraion4PageModule {}
