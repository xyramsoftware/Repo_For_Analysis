import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PatientPagePage } from './patient-page.page';
import {PopoverpagePage} from '../popoverpage/popoverpage.page'
import {PopoverpagePageModule} from '../popoverpage/popoverpage.module'

const routes: Routes = [
  {
    path: '',
    component: PatientPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  //  PopoverpagePageModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[],
  declarations: [PatientPagePage],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatientPagePageModule {}
