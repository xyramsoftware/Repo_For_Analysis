import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DataTableModule} from "angular2-datatable";

import { ReportComponent } from './reports.compoent';
import { AddPickupComponent } from '../pickup/addpickup/addpickup';

@NgModule({
  imports: [CommonModule, FormsModule,RouterModule,DataTableModule],
  declarations: [ReportComponent],
  exports: [ReportComponent,DataTableModule]
})
export class ReportModule {
}
