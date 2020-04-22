import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdfPage } from './pdf';
// import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    PdfPage,
  ],
  imports: [
   // PdfViewerModule,
    IonicPageModule.forChild(PdfPage),
  ],
  exports: [
    //PdfViewerModule
 ]
})
export class PdfPageModule {}
