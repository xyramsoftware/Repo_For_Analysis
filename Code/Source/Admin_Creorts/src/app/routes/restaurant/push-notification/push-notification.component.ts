import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';
import { PushNotificationService } from './push-notification.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss'],
  providers: [PushNotificationService]
})
export class PushNotificationComponent {

  // message: any = {
  //   //app_id: "614240e3-c369-44a1-82fb-73227bd2c71c",
  //    app_id:"230d3e93-0c29-49bd-ac82-ecea8612464e",
  //   contents: {"en": ''},
  //   headings: {"en": ''},
  //   included_segments: ["All"]
  // };

  public notification: any = {}
  public isLoading: boolean = false;
  eventsList: any = []
  eventid: any
  public loading: boolean = true;
  eachEvent: any
  constructor(public router: Router,
    public pushNotification: PushNotificationService,
    public toster: ToastrService) {
    this.pushNotification.getEventsList().subscribe(response => {
      this.eventsList = response;
      console.log(this.eventsList)
      this.eventid = this.eventsList[0]._id
      this.showEvent(this.eventid);
      this.loading = !this.loading
    });




  }

  showEvent(eventid: any) {
    this.pushNotification.getEventsById(eventid).subscribe(response => {

      this.eachEvent = response;
      console.log(this.eachEvent)
    }
    );
  }
  cancel() {
    this.router.navigate(['/coupons/all/']);

  }


}
