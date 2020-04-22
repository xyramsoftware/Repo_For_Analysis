import { Component } from '@angular/core';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'toastr-ng2';
import { ReportsService } from './report.service'
import { OrdersService } from '../orders/orders.service';
import { ConstantService } from '../../../constant.service'
import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { checkNoChangesView } from '@angular/core/src/view/view';

const swal = require('sweetalert');

@Component({
  selector: 'report',
  templateUrl: './reportes.html',
  styleUrls: ['./report.scss'],
  providers: [ReportsService, OrdersService]
})
export class ReportComponent {
  user:any
  Accuser:any
  teamuser:any
  cultuser:any
  registeredUser:any
  checkedinUser:any
  minSIndiv:any
  maxSIndiv:any
  SIndivMaxValue:any
  STeammaxValue:any
  minSTeam:any
  maxSTeam:any
  CultMaxValue:any
  CultMinValue:any
  minCult:any
  maxCult:any
  selectedMin1: any=0
  selectedMax1: any=18
  selectedMin2: any=0
  selectedMax2: any=18
  selectedMin3: any=0
  selectedMax3: any=18

  selectedSportsIndividual: any 
  selectedSportsTeam: any 
  selectedCultural: any 
  selectedSportsIndividualID: any
  selectedSportsTeamID: any
  selectedCulturalID: any


  selectedSIndividualGender: any 
  selectedSTeamGender: any 
  selectedCulturalGender: any 

  eventsList = []
  sportsIndividual = {}
  sportsTeam = {}
  cultural = {}
  STeamData = [
    {
      categoryName: '',
      eventType: '',
      categoryId: '',
      eventTypeId: '',
      events: []
    }
  ]
  SIndivData = [
    {
      categoryName: '',
      eventType: '',
      categoryId: '',
      eventTypeId: '',
      events: []
    }
  ]
  CulturalData = [
    {
      categoryName: '',
      eventType: '',
      categoryId: '',
      eventTypeId: '',
      events: []
    }
  ]
  orders: Array<any>;
  items: any = []
  public loading: boolean = true;
  displaytodaydata: boolean = true
  selectedValue = '---select Gender---';
  todayorderLength: any
  headers: Headers;
 public individual :any ={}
 
  constructor(public router: Router,
    public toastr: ToastrService,
    public ReportsService: ReportsService,
    public constantService: ConstantService,
    public http: Http
  ) {


    this.geteventData();


  }


  geteventData() {
    this.ReportsService.getEventsList().subscribe(response => {
      this.eventsList = response;
      console.log(this.eventsList)

      for (let i = 0; i < this.eventsList.length; i++) {

        if (this.eventsList[i].categoryName == "Sports" && this.eventsList[i].EventTypeName == "Team Event") {
          let n = 0
          this.STeamData[0].categoryName = this.eventsList[i].categoryName;
          this.STeamData[0].eventType = this.eventsList[i].EventTypeName;
          this.STeamData[0].categoryId = this.eventsList[i].CategoryID;
          this.STeamData[0].eventTypeId = this.eventsList[i].EventTypeID
          this.STeamData[0].events.push(this.eventsList[i]);
        }
      }
      for (let i = 0; i < this.eventsList.length; i++) {
        if (this.eventsList[i].categoryName == "Sports" && this.eventsList[i].EventTypeName == "Individual Event") {
          let n = 1
          this.SIndivData[0].categoryName = this.eventsList[i].categoryName;
          this.SIndivData[0].eventType = this.eventsList[i].EventTypeName;
          this.SIndivData[0].categoryId = this.eventsList[i].CategoryID;
          this.SIndivData[0].eventTypeId = this.eventsList[i].EventTypeID
          this.SIndivData[0].events.push(this.eventsList[i]);
        }
      }
      for (let i = 0; i < this.eventsList.length; i++) {
        if (this.eventsList[i].categoryName == "Cultural" && this.eventsList[i].EventTypeName == "Individual Event") {
          let n = 2
          this.CulturalData[0].categoryName = this.eventsList[i].categoryName;
          this.CulturalData[0].eventType = this.eventsList[i].EventTypeName;
          this.CulturalData[0].categoryId = this.eventsList[i].CategoryID;
          this.CulturalData[0].eventTypeId = this.eventsList[i].EventTypeID
          this.CulturalData[0].events.push(this.eventsList[i]);
        }
      }



      console.log(this.CulturalData[0].categoryId);
      //  this.getSportsIndividual(this.SIndivData[0].categoryId,this.SIndivData[0].eventTypeId);
      // this.getSportsTeam(this.STeamData[0].categoryId,this.STeamData[0].eventTypeId);
      // this.getCultural(this.CulturalData[0].categoryId,this.CulturalData[0].eventTypeId);

      console.log(this.STeamData)
      console.log(this.SIndivData)
      console.log(this.CulturalData)
      this.loading = !this.loading
    });


  }


  getSportsIndividual(catid: any, eventid: any) {
    //console.log(catid,eventid)
    this.ReportsService.getSportsIndividualList(catid, eventid).subscribe(response => {
      this.sportsIndividual = response;
      console.log('Sports Individual', this.sportsIndividual)
    });
  }
  getSportsTeam(catid: any, eventid: any) {
    this.ReportsService.getSportsTeamList(catid, eventid).subscribe(response => {
      this.sportsTeam = response;
      console.log('Sports Team', this.sportsTeam)
    });
  }
  getCultural(catid: any, eventid: any) {
    this.ReportsService.getCulturalList(catid, eventid).subscribe(response => {
      this.cultural = response;
      console.log('Cultural Events', this.cultural)
    });
  }
  setMin1(value) {
    this.selectedMin1 = value;

    console.log(this.selectedMin1);
  }
  setMax1(value) {
    this.selectedMax1 = value;
    console.log(this.selectedMax1);
  }

  setMin2(value) {
    this.selectedMin2 = value;
    console.log(this.selectedMin2);
  }
  setMax2(value) {
    this.selectedMax2 = value;
    console.log(this.selectedMax2);
  }

  setMin3(value) {
    this.selectedMin3 = value;
    console.log(this.selectedMin3);
  }
  setMax3(value) {
    this.selectedMax3 = value;
    console.log(this.selectedMax3);
  }




  // onChangeSIndividual(value1) {
  //   this.selectedSportsIndividual=value1;
  //   console.log(this.selectedSportsIndividual);

  // }
  // onChangeSTeam(value2) {
  //   this.selectedSportsTeam=value2
  //   console.log(this.selectedSportsTeam);

  // }

  // onChangeCultural(value3) {
  //   this.selectedCultural=value3;
  //   console.log(this.selectedCultural);

  // }

  setTeam(newValue) {
    console.log(newValue);
    this.selectedSportsTeamID=newValue;
    
  }

  setSIndividual(newValue) {
    console.log(newValue);
    this.selectedSportsIndividualID=newValue;
  }
  setCultural(newValue) {
    console.log(newValue);
    this.selectedCulturalID=newValue;
  }


  setTeamGender(newValue) {
    console.log(newValue);
    this.selectedSTeamGender = newValue;
  }

  setSIndividualGender(newValue) {
    console.log(newValue);
    this.selectedSIndividualGender = newValue;
  }
  setCulturalGender(newValue) {
    console.log(newValue);
    this.selectedCulturalGender = newValue;
  }

  getSportIndividual() {

    this.ReportsService.getSportIndividualReport( this.selectedSIndividualGender, this.selectedSportsIndividualID, this.selectedMin1, this.selectedMax1).subscribe(response => {
      //let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      //const url= window.URL.createObjectURL(blob);
      //window.open(url);
      window.location.href = response.url;
      //fileSaver.saveAs(blob, 'employees.json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  getSportIndividualchecked() {

    this.ReportsService.getSportIndividualQRReport( this.selectedSIndividualGender, this.selectedSportsIndividualID, this.selectedMin1, this.selectedMax1).subscribe(response => {
      //let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      //const url= window.URL.createObjectURL(blob);
      //window.open(url);
      window.location.href = response.url;
      //fileSaver.saveAs(blob, 'employees.json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  getSportTeam() {

    this.ReportsService.getSportTeamReport( this.selectedSTeamGender, this.selectedSportsTeamID, this.selectedMin2, this.selectedMax2).subscribe(response => {
      //let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      //const url= window.URL.createObjectURL(blob);
      //window.open(url);
      window.location.href = response.url;
      this.toastr.success('Report Generated Succesfully');
      //fileSaver.saveAs(blob, 'employees.json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  getCulturalReport() {

    this.ReportsService.getCulturalReport( this.selectedCulturalGender, this.selectedCulturalID, this.selectedMin3, this.selectedMax3).subscribe(response => {
      //let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      //const url= window.URL.createObjectURL(blob);
      //window.open(url);
      window.location.href = response.url;
      this.toastr.success('Report Generated Succesfully');
      //fileSaver.saveAs(blob, 'employees.json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  getCulturalReportchecked() {

    this.ReportsService.getCulturalQRReport( this.selectedCulturalGender, this.selectedCulturalID, this.selectedMin3, this.selectedMax3).subscribe(response => {
      //let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      //const url= window.URL.createObjectURL(blob);
      //window.open(url);
      window.location.href = response.url;
      this.toastr.success('Report Generated Succesfully');
      //fileSaver.saveAs(blob, 'employees.json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }
  getAllReport() {

    this.ReportsService.getAllReport().subscribe(response => {
      //let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      //const url= window.URL.createObjectURL(blob);
      //window.open(url);
      window.location.href = response.url;
      this.toastr.success('Report Generated Succesfully');
      //fileSaver.saveAs(blob, 'employees.json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }
  getAccompanyReport() {

    this.ReportsService.getAccompanyReport().subscribe(response => {
      //let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      //const url= window.URL.createObjectURL(blob);
      //window.open(url);
      window.location.href = response.url;
      this.toastr.success('Report Generated Succesfully');
      //fileSaver.saveAs(blob, 'employees.json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }
  getAccompanyReportchecked(){
    this.ReportsService.getAccompanyQRReport().subscribe(response => {
      //let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      //const url= window.URL.createObjectURL(blob);
      //window.open(url);
      window.location.href = response.url;
      this.toastr.success('Report Generated Succesfully');
      //fileSaver.saveAs(blob, 'employees.json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  getSportTeamchecked(){
    this.ReportsService.getTeamQRReport( this.selectedCulturalGender, this.selectedCulturalID, this.selectedMin3, this.selectedMax3).subscribe(response => {
      //let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      //const url= window.URL.createObjectURL(blob);
      //window.open(url);
      window.location.href = response.url;
      this.toastr.success('Report Generated Succesfully');
      //fileSaver.saveAs(blob, 'employees.json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

}
