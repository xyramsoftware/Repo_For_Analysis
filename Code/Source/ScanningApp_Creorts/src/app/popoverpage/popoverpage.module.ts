import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PopoverpagePage } from './popoverpage.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: PopoverpagePage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // RouterModule.forChild(routes)
  ],
  exports: [
    PopoverpagePage //<----- this is if it is going to be used else where
  ],
  // entryComponents: [PopoverpagePage], 
  declarations: [PopoverpagePage]
})
export class PopoverpagePageModule {}
