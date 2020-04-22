import { Component } from '@angular/core';
import { ToastrService } from 'toastr-ng2';
import { Router } from '@angular/router';
import { OrdersService } from './orders.service';
import { NgForm } from '@angular/forms';
import { throwIfAlreadyLoaded } from 'app/core/module-import-guard';
import { ColorsService } from '../../../shared/colors/colors.service';
const swal = require('sweetalert');

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersService]
})
export class OrdersComponent {
  pieColors = [{
    borderColor: [
      this.colors.byName('danger'),
      this.colors.byName('yellow'),
      this.colors.byName('green'),
      this.colors.byName('success'),
      this.colors.byName('primary'),
    ],
    backgroundColor: [
      this.colors.byName('danger'),
      this.colors.byName('yellow'),
      this.colors.byName('green'),
      this.colors.byName('success'),
      this.colors.byName('primary'),
     
    ],
    pointBackgroundColor: 'rgba(225,10,24,0.2)',
    pointBorderColor: '#fff',
  }];

  pieColors2 = [{
    borderColor: [
      this.colors.byName('green'),
      this.colors.byName('danger'),
      this.colors.byName('yellow'),
      this.colors.byName('primary'),
      this.colors.byName('success'),
    ],
    backgroundColor: [
      this.colors.byName('green'),
      this.colors.byName('danger'),
      this.colors.byName('yellow'),
      this.colors.byName('primary'),
      this.colors.byName('success'),
     
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


    animation: {


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
        }
        );
      }
    }



  };
  public chartOptions: any = {
    responsive: true
  };
  Isoverall: boolean = false
  IsData: boolean = true;
  Isevent: boolean ;

  feedbackData: any = []
  eventData: any = []
  value: any = []
  public loading: boolean = true;
  public quesOne = {
    labels: [],
    datasets: [{
      data: []
    }]
  };

  public quesTwo = {
    labels: [],
    datasets: [{
      data: []
    }]
  };

  userId: any = []
  constructor(public toastr: ToastrService,
    public router: Router,
    public ordersService: OrdersService,
    private colors: ColorsService, ) {

    this.ordersService.getFeedbackList().subscribe(response => {
      this.feedbackData = response;
      console.log(this.feedbackData);
      //console.log(this.feedbackData.userId);
      this.loading = !this.loading
    });
    this.ordersService.getFeedbackeventList().subscribe(response => {
      this.eventData = response;
      console.log(this.eventData);
     // console.log(this.eventData.userId);
      this.loading = !this.loading
    });


    this.getQuestionOneCount();
    this.getQuestionTwoCount();
  }


  Show(feedid: any, eventid: any) {
    console.log('viewid', feedid, eventid);
    //this.router.navigate(['/order/viewOrder/',id]);
    this.router.navigate(['/order/viewOrder/'], { queryParams: { key1: feedid, key2: eventid } });
  }
  back() {
    this.IsData=true;
    this.Isevent=false;
    this.Isoverall=false;
    //this.router.navigate(['/order']);
  }
  feedbackGraph() {
    this.Isoverall = true;
    this.Isevent = false;
    this.IsData = false;
    this.router.navigate(['/order/allOrder/']);
  }

  eventGraph() {
    this.Isoverall = false;
    this.Isevent = true
    this.IsData = false
    this.router.navigate(['/order/allOrder/']);
  }
  getQuestionOneCount() {
    this.ordersService.getQuestionOne().subscribe(response => {

      this.quesOne = response;
    }
    );

  }
  getQuestionTwoCount() {
    this.ordersService.getQuestionTwo().subscribe(response => {

      this.quesTwo = response;
    });

  }

  public chartClicked(e: any): void {
    console.log(e);
  }
}
