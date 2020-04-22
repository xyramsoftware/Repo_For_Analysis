import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../app/registration/registration.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DialogComponent } from '../../app/registration/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  categoryMasterList: any = [];
  categorydata: any = [];
  eventTypes: any = [];
  eventDetails: any = [];
  popup: boolean;
  teamReg: any = [];
  userdetails: any = [];
  selectedEvents: any = [];
  Obj: any = [];
  sprtiindividulaevents: any[];
  culturaevent: any = [];
  paymentEvents: any = [];
  QRevnt: any[];
  QrCodeScanItem: any = [];
  eventCount: number = 0;
  flag: boolean;
  loading: boolean = true;
  checked: boolean;
  repteam: FormGroup;
  noEvent: boolean;
  disableScreen: boolean = true;
  paymentPage: boolean;

  constructor(private restService: RegistrationService, public dialog: MatDialog, private router: Router, private toastr: ToastrService, private fb: FormBuilder) {
    this.userdetails = JSON.parse(localStorage.getItem('userdetails'));
    this.selectedEvents = this.userdetails.TotalEventsList;
    console.log('User details: ', this.userdetails.TotalEventsList)
    this.repteam = this.fb.group({
      representingTeam: [this.userdetails.representingTeam]
    })
  }

  players: any = [{}];

  getallevents() {
    this.restService.eventList().subscribe(data => {
      this.categorydata = data
      this.getalltypes();
    })
  }

  getalltypes() {
    this.restService.typeList().subscribe(data => {
      this.eventTypes = data
      this.displayEvetnsList()
    })
  }

  ngOnInit(): void {
    if(this.categorydata.length == 0){
      this.getallevents();
    }else {
      this.loading = false;
    }
  }

  showSuccess() {
    // this.toastr.info('OK', 'Its a paid event, you need to pay Rs 500!', { disableTimeOut: true});
    this.toastr.show('<button type="button" class="btn clear btn-toastr" onclick="toastr.clear()">OK</button>', 'Its a paid event, you need to pay Rs 500!', { disableTimeOut: true, closeButton: false, enableHtml:true});
  }
  displayEvetnsList() {
    const categoryList: Array<any> = [];
    this.categorydata.map(
      category => {
        console.log(category.categoryName);
        this.eventTypes.map(event => {
          switch (event.eventTypeName) {
            case 'Individual Event':
              break;
            case 'TeamEventType':
              break;
          }
          this.restService.geteventsByEventType(category._id, event._id).subscribe(
            data => {
              let count = 0;
              for (let i = 0; i < data.length; i++) {
                data[i]['checked'] = false;
                data[i]['isSelected'] = false;
                this.eventCount = this.eventCount + 1;
                count += 1;

                for (let j = 0; j < this.selectedEvents.length; j++) {
                  if (this.selectedEvents[j]['EventId'] == data[i]['_id']) {
                    data[i]['isSelected'] = true;
                    this.eventCount = this.eventCount - 1;
                    count -= 1;
                  }
                }
              }
              if (!data.length) {
                //TODO: Add handler to control if no records 
              } else {
                this.loading = false;
                let unitData = {
                  'categoryName': category.categoryName,
                  'eventType': event.eventTypeName,
                  'events': data,
                  'count': count
                }
                this.categoryMasterList.push(unitData);
              }
              this.flag = true;
            }
          )
        });
      }
    );
    console.log('master data: ', this.categoryMasterList);
  }

  openDialog(event: MatCheckboxChange, eventdata, eventType: string) {

    console.log(event, eventdata)
    if (eventdata.checked == false && eventdata.paymentGateway == true) {
      console.log('payment');
      this.showSuccess();
    }
    if (eventdata.checked == false && eventType == 'Team Event') {

      localStorage.setItem('Events', JSON.stringify(eventdata));
      const dialogConfig = new MatDialogConfig();

      dialogConfig.panelClass = 'app-full-bleed-dialog';
      dialogConfig.autoFocus = true;
      dialogConfig.width = "100%";
      dialogConfig.height = "80%";
      dialogConfig.disableClose = true;

      this.router.events
        .subscribe(() => {
          dialogRef.close();
        });
      ///{data:eventdata}
      const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {
        this.checked = false;
        console.log(data)
        if (data.isClose == false) {
          eventdata.checked = true;
          //this.checked = true;
          eventdata = JSON.parse(localStorage.getItem('Events'));
          console.log('----------', this.checked);
          this.eventDetails.push(eventdata)
          this.teamReg.push(eventdata)
        } else {
          eventdata.checked = false;
          this.checked = false;
          console.log("unchecked", this.checked);
        }

      });

      console.log(eventdata);
    }
    if (eventdata.checked == true && eventType == 'Team Event') {
      // eventdata.checked = false;
      for (let i = 0; i < this.eventDetails.length; i++) {
        if (this.eventDetails[i]._id == eventdata._id) {
          this.eventDetails.splice(i, 1)
          this.teamReg.splice(i, 1)
          console.log("bye")
        }
      }
    }

    if (eventdata.checked == false && eventType != "Team Event") {
      eventdata.checked = true
      this.eventDetails.push(eventdata)

    } else {
      if(eventType != "Team Event"){
      eventdata.checked = false;        
      }
      // eventdata.checked = false;
      for (let i = 0; i < this.eventDetails.length; i++) {
        if (this.eventDetails[i]._id == eventdata._id) {
          this.eventDetails.splice(i, 1)
        }
      }

    }
    console.log("selecetd events")
    console.log(this.eventDetails);

    if (this.eventDetails.length > 0) {
      this.repteam.controls["representingTeam"].setValidators(Validators.required);
    } else {
      this.repteam.controls["representingTeam"].setValidators([]);
    }
    this.repteam.controls["representingTeam"].updateValueAndValidity();

  }


  update() {

    if (this.repteam.valid) {
      if (!this.loading) {
        if (this.eventDetails.length > 0) {
          console.log(this.selectedEvents)
          console.log(this.eventDetails)
          console.log(this.sprtiindividulaevents)
          console.log(this.teamReg)
          console.log(this.teamReg.length)
          console.log(this.userdetails)
          this.loading = true;

          this.userdetails.representingTeam = this.repteam.get('representingTeam').value;

          if (this.userdetails.paymentEvents == undefined) {
            this.userdetails.paymentEvents = []
          }

          console.log(this.eventDetails)

          for (let i = 0; i < this.eventDetails.length; i++) {
            if (this.eventDetails[i].paymentGateway == true) {
              this.paymentEvents.push(this.eventDetails[i])
            }
            let QrcodeObj = {
              EventId: this.eventDetails[i]._id,
              EventName: this.eventDetails[i].title,
              QREventScan: false
            }

            this.userdetails.TotalEventsList.push(QrcodeObj)

            this.userdetails.QREvents.push(this.eventDetails[i].title)

            if (this.eventDetails[i].categoryName == 'Cultural') {
              this.userdetails.culturalReg.push(this.eventDetails[i])
            }
            if (this.eventDetails[i].categoryName == 'Sports' && this.eventDetails[i].EventTypeName == 'Individual Event') {
              this.userdetails.sportIndividualReg.push(this.eventDetails[i])
            }
            if (this.eventDetails[i].categoryName == 'Sports' && this.eventDetails[i].EventTypeName == 'Team Event') {
              this.userdetails.teamReg.push(this.eventDetails[i])
            }
            if (this.eventDetails[i].paymentGateway == true) {
              this.userdetails.paymentEvents.push(this.eventDetails[i])
            }
          }

          if (this.userdetails.emailCheck == false) {
            delete this.userdetails.email
          }

          if (this.userdetails.teamReg.length == 0) {
            this.userdetails.TeamCheck = false
          } else {
            this.userdetails.TeamCheck = true
          }
          console.log(this.userdetails)

          if (this.userdetails.paymentEvents == 0) {
            this.restService.updateUser(this.userdetails._id, this.userdetails).subscribe(data => {
              console.log(data)
              localStorage.setItem('userdetails', JSON.stringify(data));
              this.loading = false;
              this.router.navigate(['update-succes']);
            })

          } else {
            console.log("payment gateway");
            console.log(this.eventDetails);
            localStorage.setItem('eventObj', JSON.stringify(this.userdetails));
            // this.router.navigate(['payment-gateway']);
            this.paymentPage = true;
            this.loading = false;
          }
        }else{
          this.noEvent = true;
        }

      }
    } else {

      Object.keys(this.repteam.controls).forEach(field => {
        const control = this.repteam.get(field);            
        control.markAsTouched({ onlySelf: true });    
      });
    }
  }

  hideThis(){
    this.userdetails = JSON.parse(localStorage.getItem('userdetails'));
    this.paymentPage = false;
    this.loading= false;
  }
}



