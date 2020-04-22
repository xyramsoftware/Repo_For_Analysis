import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input'

import { NgxQRCodeModule } from 'ngx-qrcode2';
// import {MatFormFieldModule} from '@angular/material/form-field';
//import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';


import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    //FormGroup,
    //FormControl,
    NgxQRCodeModule, 
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
