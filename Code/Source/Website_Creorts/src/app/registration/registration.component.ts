import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  validatingForm: FormGroup;
  public selfForm: FormGroup;

  closeResult: string;
  popup: boolean
  eventTypes: any = []
  categorydata: any = []
  categorydata1: any = []
  categoryMasterList: any = [];
  eventDetails: any = []
  teamReg: any = []
  QRevnt: any = []
  paymentEvents: any = []
  sprtiindividulaevents: any = []
  culturaevent: any = []
  Obj: any = {}
  loader1: any;
  QrCodeScanItem: any = [];
  checked: boolean = false;
  reg: boolean;
  loading: boolean;
  individual: boolean;
  team: boolean;
  cultural: boolean;
  submitted: boolean;
  paymentPage: boolean;
  
  today = new Date();
  minAge = 5;
  ageLimit = new Date(this.today.getFullYear() - this.minAge, this.today.getMonth(), this.today.getDate()).toISOString().split('T')[0];
  eventObj: any = [];

  constructor(private fb: FormBuilder, public restService: RegistrationService, private router: Router, private dialog: MatDialog, private toastr: ToastrService) {
    this.selfForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      email: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9_-]{10}')]],
      gender: ['', Validators.required],
      DOB: ['', Validators.required],
      place: ['', Validators.required],
      occupation: ['', Validators.required],
      representingTeam: [''],
      schoolName: [''],
      organisation: ['']

    });
  }

  nextreg() {
    if (this.selfForm.value.occupation == 'Student') {
      this.selfForm.controls["schoolName"].setValidators(Validators.required);
    } else {
      this.selfForm.controls["schoolName"].setValidators([]);
    }
    this.selfForm.controls["schoolName"].updateValueAndValidity();
    if (this.selfForm.valid) {
      this.reg = false;
      this.individual = true;
    }
    else {
      Object.keys(this.selfForm.controls).forEach(field => { // {1}
        const control = this.selfForm.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }
  }

  prevind() {
    this.reg = true;
    this.individual = false;
  }

  nextind() {
    this.team = true;
    this.individual = false;
  }

  prevteam() {
    this.individual = true;
    this.team = false;
  }

  nextteam() {
    if (this.selfForm.valid) {
      this.team = false;
      this.cultural = true;
    }
    else {
      Object.keys(this.selfForm.controls).forEach(field => { // {1}
        const control = this.selfForm.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }
  }

  prevcul() {
    this.cultural = false;
    this.team = true;
  }
  oAuthUser: any;

  loadOauthUser() {
    this.oAuthUser = JSON.parse(localStorage.getItem('oauthUser'));
    console.log('In reg ', this.oAuthUser);
    if (this.oAuthUser) {
      console.log('before patch value');
      this.selfForm.patchValue({
        name: this.oAuthUser.name,
        email: this.oAuthUser.email
      });
      this.selfForm.controls['email'].disable();
      console.log('after patch value');
      localStorage.clear();

    }
  }
  showSuccess() {
    // this.toastr.info('Its a paid event , Please pay Rs 500 to attend the event!!!! ');
    this.toastr.show('<button type="button" class="btn clear btn-toastr" onclick="toastr.clear()">OK</button>', 'Its a paid event, you need to pay Rs 500!', { disableTimeOut: true, closeButton: false, enableHtml:true});
  }

  onResize(event) {
    event.target.innerWidth;
  }

  setExistingPhoneValidator(event) {
    if (event.target.value.length == 10) {
      this.loading = true;
      console.log('setExistingPhoneValidator');
      this.restService.checkExistingNumber(this.selfForm.value.phone).then(res => {
        this.selfForm.get('phone').setErrors(null);
        this.loading = false;
      }, error => {
        this.selfForm.get('phone').setErrors({ 'validmobile': true });
        this.loading = false;
      });
    }
  }

  setExistingEmailValidator(event) {
    
    if(this.selfForm.get('email').value && this.selfForm.get('email').valid) {
      this.loading = true;
      console.log('setExistingPhoneValidator');
      this.restService.checkExistingEmail(event.target.value).then(res => {
        this.selfForm.get('email').setErrors({ 'emailexists': true });
        this.loading = false;
      }, error => {
        this.selfForm.get('email').setErrors(null);
        this.loading = false;
      });
    }

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  players: any = [{}];

  getAllQREvents(){
    this.restService.getAllQREvents().subscribe(data=>{
      console.log("events")
      console.log(data)
      for(let i=0;i<data.length;i++){
        let Obj={
          EventId:data[i]._id,
          EventName:data[i].title,
          QRScanCheck:false
        }  
         this.eventObj.push(Obj)  
      }
     console.log('event details: ',this.eventObj)
    })
  }

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

  ngOnInit() {
    this.reg = true;
    this.getallevents();
    this.loadOauthUser();
    this.getAllQREvents();
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
              for (let i = 0; i < data.length; i++) {
                data[i]['checked'] = false;
              }
              if (!data.length) {
                //TODO: Add handler to control if no records 
              } else {
                let unitData = {
                  'categoryName': category.categoryName,
                  'eventType': event.eventTypeName,
                  'events': data
                }
                this.categoryMasterList.push(unitData);
              }
            }
          )
        });
      }
    );
    console.log(this.categoryMasterList);
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
      // eventdata.checked = false
      if(eventType != "Team Event"){
        eventdata.checked = false;        
        }
      for (let i = 0; i < this.eventDetails.length; i++) {
        if (this.eventDetails[i]._id == eventdata._id) {
          this.eventDetails.splice(i, 1)
        }
      }

    }
    console.log("selecetd events")
    console.log(this.eventDetails);

    if (this.eventDetails.length > 0) {
      this.selfForm.controls["representingTeam"].setValidators(Validators.required);
    } else {
      this.selfForm.controls["representingTeam"].setValidators([]);
    }
    this.selfForm.controls["representingTeam"].updateValueAndValidity();

  }


  register() {
    this.loading = true;
    this.submitted = true;
    this.culturaevent = []
    this.paymentEvents = []
    this.QRevnt = []
    this.sprtiindividulaevents = []
    console.log(this.selfForm.value)
    this.Obj = this.selfForm.getRawValue();
    this.Obj.phone = '91' + this.selfForm.value.phone;

    if(this.Obj.occupation == 'Student'){
      this.Obj.organisation = null;
    }else{
      this.Obj.schoolName = null;
    }

    console.log(this.eventDetails)
    console.log(this.teamReg)

    for (let i = 0; i < this.eventDetails.length; i++) {
      this.QRevnt.push(this.eventDetails[i].title)
      let QrcodeObj = {
        EventId: this.eventDetails[i]._id,
        EventName: this.eventDetails[i].title,
        QREventScan: false
      }
      console.log(QrcodeObj)
      this.QrCodeScanItem.push(QrcodeObj)
      if (this.eventDetails[i].paymentGateway == true) {
        this.paymentEvents.push(this.eventDetails[i])
      }
    }

    for (let k = 0; k < this.eventDetails.length; k++) {
      if (this.eventDetails[k].categoryName == "Sports" && this.eventDetails[k].EventTypeName == "Individual Event") {

        console.log(this.eventDetails[k])
        this.sprtiindividulaevents.push(this.eventDetails[k])
      }
      if (this.eventDetails[k].categoryName == "Cultural") {
        this.culturaevent.push(this.eventDetails[k])
      }
    }

    console.log(this.paymentEvents)
    console.log(this.sprtiindividulaevents)
    console.log(this.culturaevent)

    console.log("Qr Event list")
    console.log(this.QRevnt)

    this.Obj.QREvents = this.QRevnt
    this.Obj.teamReg = this.teamReg
    this.Obj.sportIndividualReg = this.sprtiindividulaevents
    this.Obj.culturalReg = this.culturaevent
    this.Obj.TotalEventsList = this.QrCodeScanItem
    this.Obj.paymentEvents = this.paymentEvents
    if (this.teamReg.length == 0) {
      this.Obj.TeamCheck = false
    } else {
      this.Obj.TeamCheck = true
    }

    if (this.Obj.email == "") {
      this.Obj.emailCheck = false
    } else {
      this.Obj.emailCheck = true
    }

    if (this.Obj.emailCheck == false) {
      delete this.Obj.email
    }
    this.Obj
    this.Obj.SpectatorEventList = this.eventObj;

    console.log("final sending object");
    console.log(this.Obj);
    if (this.paymentEvents.length == 0) {
      this.restService.createUser(this.Obj).subscribe(data => {
        //this.loader1.dismiss()
        console.log(data)
        this.loading = false;
        this.router.navigate(['thank-you']);

      })
    }
    else {
      console.log("payment gateway");
      localStorage.setItem('eventObj', JSON.stringify(this.Obj));
      this.paymentPage = true;
      this.cultural = false;
      // this.router.navigate(['payment-gateway']);

    }
  }

  hideThis(){
    this.paymentPage = false;
    this.cultural = true;
    this.loading = false;
  }
}