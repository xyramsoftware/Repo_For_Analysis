import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [EventsService]
})
export class EventsComponent implements OnInit {

  eventdates: any = []
  eventDetails: any = []
  currentEvents: any;
  selectedItem: any;
  CatTilte: any
  CatId: any
  userDetails: any = [];
  userEvents: any;
  fill: any;
  eventdetail:any=[];
  constructor(private restService: EventsService, private router: Router) {
    this.getalldates()
  }


  ngOnInit() {
  }

  loadevent() {

    this.userEvents = JSON.parse(localStorage.getItem('userdetails'));
    console.log(this.userEvents.TotalEventsList)
    if (this.userEvents.TotalEventsList instanceof Array) {
      for (let event of this.userEvents.TotalEventsList) {
        console.log(event.EventId);

      }
    }
  }

  getalldates() {
    this.restService.datesList().subscribe(data => {
      console.log(data)
      this.eventdates = data
      this.selectedItem = data[0]
      console.log(this.eventdates)
      this.displaycategoryData(this.eventdates[0]._id)
    })
  }

  displaycategoryData(id) {
    this.restService.displayevent(id).subscribe(data => {
      console.log(data)
      this.currentEvents = data

      this.userEvents = JSON.parse(localStorage.getItem('userdetails'))?.TotalEventsList;

      for (let i = 0; i < this.currentEvents.length; i++) {
        if (this.userEvents instanceof Array) {
          for (let userEvent of this.userEvents) {
            if (userEvent.EventId && userEvent.EventId === this.currentEvents[i]._id) {
              this.currentEvents[i].icon = true;
              console.log(this.currentEvents[i]._id, userEvent.EventId, 'true')
            }
          }
        }
        console.log(this.currentEvents[i].startTime)
        if (this.currentEvents[i].startTime != undefined) {
          let hour = (this.currentEvents[i].startTime.split(':'))[0]
          let min = (this.currentEvents[i].startTime.split(':'))[1]
          let hour1 = +(this.currentEvents[i].startTime.split(':'))[0]
          let part = +hour > 12 ? 'PM' : 'AM';
          min = (min + '').length == 1 ? `0${min}` : min;
          hour1 = +hour > 12 ? +hour - 12 : +hour;
          console.log("hours", hour1)
          let time2 = `${hour1}:${min} ${part}`
          console.log("///")
          console.log(time2)
          this.currentEvents[i].startTime = time2
        }
        if (this.currentEvents[i].endTime != undefined) {
          let hour = (this.currentEvents[i].endTime.split(':'))[0]
          let min = (this.currentEvents[i].endTime.split(':'))[1]
          let hour1 = +(this.currentEvents[i].endTime.split(':'))[0]
          let part = +hour > 12 ? 'PM' : 'AM ';
          min = (min + '').length == 1 ? `0${min}` : min;
          hour1 = +hour > 12 ? +hour - 12 : +hour;
          console.log("hours", hour1)
          let time2 = `${hour1}:${min} ${part}`
          console.log("///")
          console.log(time2)
          this.currentEvents[i].endTime = time2
        }
      }

      console.log(this.currentEvents)

    })
  }

  listClick(event, newValue) {
    console.log(newValue);
    this.selectedItem = newValue;  // don't forget to update the model here
    // ... do other stuff here ...
    this.displaycategoryData(newValue._id)
  }

  isLogin() {
    if (localStorage.getItem('webtoken') != null) {
      this.userDetails = JSON.parse(localStorage.getItem('userdetails'));
      return true;
    }
    return false;
  }

  giveFeedback(Id:number,title:any){
    console.log(Id,title);
    this.eventdetail = [Id,title]
    localStorage.setItem('eventdetail',JSON.stringify(this.eventdetail));
    console.log(Id,title);
    this.router.navigate(['event-feedback'])
  }


}




