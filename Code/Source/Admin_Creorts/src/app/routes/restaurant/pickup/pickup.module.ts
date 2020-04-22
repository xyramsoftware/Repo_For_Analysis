import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DataTableModule} from "angular2-datatable";

import { FoodPickupComponent } from './pickup.compoent';
import { AddPickupComponent } from '../pickup/addpickup/addpickup';
import { AngularMultiSelectModule } from 'angular2-multiselect-checkbox-dropdown/angular2-multiselect-dropdown'


@NgModule({
  imports: [CommonModule, FormsModule,RouterModule,DataTableModule,AngularMultiSelectModule],
  declarations: [FoodPickupComponent,AddPickupComponent],
  exports: [FoodPickupComponent,DataTableModule,AddPickupComponent]
})
export class FoodPickupModule {
}
