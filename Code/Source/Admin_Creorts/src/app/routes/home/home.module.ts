import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';

import { SharedModule } from '../../shared/shared.module';
import {AuthService} from '../pages/login/auth.service';



import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

// const routes: Routes = [
//     { path: '', component: HomeComponent },
// ];
declare var require: any;

export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/drilldown');
  dd(hc);

  return hc;
}
@NgModule({
    imports: [
        SharedModule,
        Ng2ChartsModule,
        //RouterModule.forChild(routes)
        //ChartModule.forRoot(highcharts),
        ChartModule
    ],
    providers: [{
        provide: HighchartsStatic,
        useFactory: highchartsFactory
      }],
    declarations: [HomeComponent],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }