import { Component, NgModule, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { ColorsService } from '../../../shared/colors/colors.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HomeService } from './home.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
//Highcharts
import * as Highcharts from 'highcharts';
// import  More from 'highcharts/highcharts-more';
// More(Highcharts);
import * as Drilldown from 'highcharts/modules/drilldown';
//Drilldown(Highcharts);
import * as Exporting from 'highcharts/modules/exporting.src';
// Initialize exporting module.
Exporting(Highcharts);


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  
  socialmediaDisplay: boolean = false


  user_data = [];
  drill_down_data = [];
  //chartdata: any = []
  chartdata: Array<any>;
  user_data1:any
  drill_down_data1:any
  // Pie chart
  // -----------------------------------

  genderData = {
    labels: [],
    datasets: [{
      data: []
    }]

  };
  occupationData = {
    labels: [],
    datasets: [{
      data: []
    }]


  };
  teamData = {
    labels: [],
    datasets: [{
      data: []
    }]


  };


  sportsData = {
    labels: [],
    datasets: [{
      data: []
    }]


  };
  culturalData = {
    labels: [],
    datasets: [{
      data: []
    }]


  };
  teamEventsData = {
    labels: [],
    datasets: [{
      data: []
    }]


  };
  pieColors = [{
    borderColor: [
      this.colors.byName('info'),
      this.colors.byName('yellow'),
      this.colors.byName('purple'),
      this.colors.byName('warning'),
      this.colors.byName('danger'),
      this.colors.byName('inverse'),
      this.colors.byName('pink'),
      this.colors.byName('green'),
      this.colors.byName('gray-darker'),
      this.colors.byName('primary')
    ],
    backgroundColor: [
      this.colors.byName('info'),
      this.colors.byName('yellow'),
      this.colors.byName('purple'),
      this.colors.byName('warning'),
      this.colors.byName('danger'),
      this.colors.byName('inverse'),
      this.colors.byName('gray-darker'),
      this.colors.byName('green'),
      this.colors.byName('pink'),
      this.colors.byName('primary')
    ],
    pointBackgroundColor: 'rgba(225,10,24,0.2)',
    pointBorderColor: '#fff',
  }];


  pieOptions = {
    responsive: true,
    //scaleShowVerticalLines: false,
    maintainAspectRatio: true,
    scaleShowValues: true,
    scaleValuePaddingX: 20,
    scaleValuePaddingY: 10,
    legend: {
      position: 'right', labels: {
        fontSize: 10,
        usePointStyle: true
      }
    },
    borderColor: ['#000000'], borderWidth: [10],

    // scales: {
    //   xAxes: [{
    //    // stacked: true,
    //    // ticks: { fontColor: 'black',beginAtZero: true, autoSkip: false },

    //     gridLines: { color: 'rgba(255,255,255,0.1)' },
    //     labels:{fontColor:'black'},
    //   }],
    //   yAxes: [{
    //     //stacked: true,
    //     ticks: { fontColor: 'black' ,beginAtZero: true},

    //     gridLines: { color: 'rgba(255,255,255,0.1)' },
    //     labels:{fontColor:'black'},

    //   }]
    // },
    //   tooltips: {
    //     mode: 'index',
    //     intersect: false
    //  },
    //  hover: {
    //     mode: 'index',
    //     intersect: false
    //  },
    //  title:{
    //   display:true,
    //   text:'Report'
    // },
    //    title: {
    //     display: true,
    //     text:
    //      [
    //             {teamevent:{
    //                 id: 'teamevent',
    //                 text: 'Team',
    //                 fontSize: 16,}

    //             },
    //             {
    //                 id: 'B',
    //                 text: 'Row2',
    //                 fontSize: 14,

    //             },
    //             {
    //                 id: 'C',
    //                 text: 'Row3',
    //                 fontSize: 12,

    //             }
    //         ]
    //     }
    // ,
    // plugins: {
    //   datalabels: {
    //     anchor: 'end',
    //     align: 'top',
    //     formatter: Math.round,
    //     font: {
    //       weight: 'bold'
    //     }
    //   }
    // },
    // title:{
    //   display:true,
    //   text:'Report'
    // },
    animation: {
      // onComplete: function () {
      //   const chartInstance = this.chart,
      //     ctx = chartInstance.ctx;

      //   const fontSize = 20;
      //   const fontStyle = '600';
      //   const fontFamily = 'Open Sans';
      //   // ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

      //   ctx.textAlign = 'center';
      //   ctx.textBaseline = 'bottom';
      //   // ctx.fillStyle = '#676A6C';

      //   this.data.datasets.forEach(function (dataset, i) {
      //     const meta = chartInstance.controller.getDatasetMeta(i);
      //     meta.data.forEach(function (bar, index) {
      //       if (dataset.data[index] !== 0) {
      //         const data = dataset.data[index].toLocaleString('it-IT', { maximumFractionDigits: 0 });
      //         ctx.fillText(data, bar._model.x, bar._model.y - 0);
      //       }
      //     });
      //   });
      // }


      onComplete: function () {
        var ctx = this.chart.ctx;
        // ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        this.data.datasets.forEach(function (dataset) {

          for (var i = 0; i < dataset.data.length; i++) {
            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
              total = dataset._meta[Object.keys(dataset._meta)[0]].total,
              mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
              start_angle = model.startAngle,
              end_angle = model.endAngle,
              mid_angle = start_angle + (end_angle - start_angle) / 2;

            var x = mid_radius * Math.cos(mid_angle);
            var y = mid_radius * Math.sin(mid_angle);

            ctx.fillStyle = '#fff';



            var val = dataset.data[i];
            // var percent = String(Math.round(val/total*100)) + "%";

            if (val != 0) {
              ctx.fillText(dataset.data[i], model.x + x, model.y + y);
              // Display percent in another line, line break doesn't work for fillText
              // ctx.fillText(percent, model.x + x, model.y + y + 15);
            }
          }
        });
      }
    }



  };




  datePipeEn: DatePipe = new DatePipe('en-US');
  socialmedia: any = [{ facebook: 0, twitter: 0, instagram: 0 }

  ]
  userCount: any
  accompanyCount: any
  teamCount: any
  referCount: any
  feedbackCount: any
  user: any = {};
  drilldown_user: any = {}

  constructor(private colors: ColorsService,
    private http: Http,
    public router: Router,
    public homeService: HomeService) {

    this.userCount = 0
    this.accompanyCount = 0
    this.teamCount = 0
    this.referCount = 0
    this.feedbackCount = 0
    this.teamData.datasets[0].data[0] = 0

    this.homeService.getGenderCount()
      .subscribe(response => {

        this.genderData = response;
        console.log("pie chart")
        console.log(this.genderData)

      });


    this.homeService.getOccupationCount()
      .subscribe(response => {

        this.occupationData = response;
        console.log("pie chart-occupation")
        console.log(this.occupationData)

      });

    this.homeService.getTeamCount().subscribe(response => {
      console.log('team count')

      if (response.datasets[0].data.length > 0) {
        this.teamData = response;
        console.log(response)
      }
      else {
        this.teamData.datasets[0].data[0] = 0
        console.log(this.teamData.datasets[0].data[0])
      }
    });

    this.homeService.getReferCount().subscribe(response => {
      console.log('refer count')
      console.log(response)
      this.referCount = response;

    });
    this.homeService.getSportsCount().subscribe(response => {
      console.log('Sports count')
      console.log(response)
      this.sportsData = response;

    });

    this.homeService.getCulturalCount().subscribe(response => {
      console.log('Cultural count')
      console.log(response)
      this.culturalData = response;

    });

    this.homeService.getTeamEvenCount().subscribe(response => {
      console.log('Team events count')
      console.log(response)
      this.teamEventsData = response;

    });

    this.homeService.getFeedbackCount().subscribe(response => {
      console.log('Feedback count')
      console.log(response)
      this.feedbackCount = response;

    });

    this.getSocilaMediaCount()
    this.getUserCount()
    this.getAccompanyCount()


  }

  ngOnInit() {
   
  }

  getSocilaMediaCount() {
    this.homeService.getSocialMedia()
      .subscribe(response => {
        if (response != 0) {
          console.log(response)
          this.socialmediaDisplay = true
          this.socialmedia = response;
          console.log(this.socialmedia)
        }
        else {
          this.socialmediaDisplay = true
          console.log(this.socialmedia);
        }
      })

  }

  getUserCount() {
    this.homeService.getUserCount().subscribe(response => {
      console.log(response)
      this.userCount = response;

    })

  }

  getAccompanyCount() {
    this.homeService.getAccompanyCount().subscribe(response => {
      console.log(response)
      this.accompanyCount = response;

    })

  }


 


}
