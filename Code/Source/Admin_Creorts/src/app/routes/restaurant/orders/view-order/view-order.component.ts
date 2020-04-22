import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import { ToastrService } from 'toastr-ng2';
import { OrdersService } from '../orders.service';


const swal = require('sweetalert');
const fs = require('fs');
@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
  providers: [OrdersService]
})

export class ViewOrderComponent implements OnInit {




  public chartOptions: any = {
    responsive: true
  };

  feedbackId: any
  feedbackDetails: any = []
  userDetails: any = []

  feedbackEventId: any
  feedbackEventDetails: any = []
  EventuserDetails: any = []
  overallFeedback: boolean = false
  eventFeedback: boolean = false
  constructor(private route: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService,
    public activatedRoute: ActivatedRoute,
    public ordersService: OrdersService) {
    this.activatedRoute.queryParams.subscribe(params => {
      let value_1 = params['key1'];
      var value_2 = params['key2'];
      var str=value_2.split(",",2);
      var eventId=str[1]
      var userId=str[0]
      console.log('id',userId,eventId);
      if (value_2 != 0) {
        this.feedbackEventId = value_2;
        this.ordersService.getFeedbackeventByUserId(userId,eventId).subscribe(response => {
          this.feedbackEventDetails = response;
          this.feedbackEventDetails.EventName = this.feedbackEventDetails[0].EventName;
          this.feedbackEventDetails.rateOrganization = this.feedbackEventDetails[0].rateOrganization;
          this.feedbackEventDetails.rateEvent = this.feedbackEventDetails[0].rateEvent;
          this.feedbackEventDetails.objective = this.feedbackEventDetails[0].objective;
          this.feedbackEventDetails.experience = this.feedbackEventDetails[0].experience;
          this.feedbackEventDetails.partofNextSportival = this.feedbackEventDetails[0].partofNextSportival;
          this.feedbackEventDetails.positiveComments = this.feedbackEventDetails[0].positiveComments;
          this.feedbackEventDetails.negativeComments = this.feedbackEventDetails[0].negativeComments;
          this.EventuserDetails = this.feedbackEventDetails[0].userInfo[0];
          console.log(this.EventuserDetails);
          console.log('event', response)
        }); //function call to get userDetails by id

        this.eventFeedback = true
        this.overallFeedback = false

      }
      if (value_1 != 0) {
        this.feedbackId = value_1;
        this.ordersService.getFeedbackByUserId(value_1).subscribe(response => {
          this.feedbackDetails = response;
          this.feedbackDetails.rateOrganization = this.feedbackDetails[0].rateOrganization;
          this.feedbackDetails.rateEvent = this.feedbackDetails[0].rateEvent;
          this.feedbackDetails.objective = this.feedbackDetails[0].objective;
          this.feedbackDetails.experience = this.feedbackDetails[0].experience;
          this.feedbackDetails.partofNextSportival = this.feedbackDetails[0].partofNextSportival;
          this.feedbackDetails.positiveComments = this.feedbackDetails[0].positiveComments;
          this.feedbackDetails.negativeComments = this.feedbackDetails[0].negativeComments;
          this.userDetails = this.feedbackDetails[0].userInfo[0];
          console.log(this.userDetails);
          console.log('view', response)
        }); //function call to get userDetails by id
        this.overallFeedback = true
        this.eventFeedback = false
        console.log(this.feedbackDetails);
      }
    });
    // this.route.params.map(params => params['id']).subscribe(Id => {
    //   if (Id != null) {
    //     this.feedbackId = Id;
    //     this.ordersService.getFeedbackById(Id).subscribe(response => {
    //       this.feedbackDetails = response;
    //       this.feedbackDetails.rateOrganization = this.feedbackDetails[0].rateOrganization;
    //       this.feedbackDetails.rateEvent = this.feedbackDetails[0].rateEvent;
    //       this.feedbackDetails.objective = this.feedbackDetails[0].objective;
    //       this.feedbackDetails.experience = this.feedbackDetails[0].experience;
    //       this.feedbackDetails.partofNextSportival = this.feedbackDetails[0].partofNextSportival;
    //       this.feedbackDetails.positiveComments = this.feedbackDetails[0].positiveComments;
    //       this.feedbackDetails.negativeComments = this.feedbackDetails[0].negativeComments;
    //       this.userDetails = this.feedbackDetails[0].userInfo[0];
    //       console.log(this.userDetails);
    //       console.log('view', response)
    //     }); //function call to get userDetails by id

    //   }
    // });


  }

  ngOnInit() { }

}