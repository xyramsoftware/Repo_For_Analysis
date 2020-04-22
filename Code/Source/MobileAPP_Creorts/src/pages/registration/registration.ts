import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, LoadingController, NavParams, Platform, SegmentButton } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { RegistrationService } from './registration.service';
import { SocketService } from '../../providers/socket-service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { OrdersService } from '../orders/orders.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { CompileMetadataResolver } from '@angular/compiler';




@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
  providers: [Facebook, GooglePlus, TwitterConnect, RegistrationService, OrdersService]
})
export class RegistrationPage {
  

  Self: FormGroup;
  EmailErrorMessage: boolean = false
  displayeventerroermessage: any
  Reg: any = "Self Registration"
  showPhoneErrorMessage: boolean = false
  dislayschool: boolean = false
  nubervalidatin: boolean = false
  title = 'FormValidation';
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  isValidFormSubmitted = false;
  entersschoolName:boolean = false
  Selectedevents:any=[]
  date:any

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public fb: FormBuilder,
    //public facebook: Facebook,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public googlePlus: GooglePlus,
    public loadingCtrl: LoadingController,
    public twitter: TwitterConnect,
    public platform: Platform,
    private sanitizer: DomSanitizer,
    public registrationService: RegistrationService,
    private orderService: OrdersService,
    public socketService: SocketService) {
  
      this.date = moment().subtract(5, 'years').toDate();

      this.date = moment(this.date).format('YYYY-MM-DD')
      
      console.log(this.date)
 
         
    //const now = moment();

    //let last5 = now.subtract('years', 5);
  }


  loadOauthUser() {
    let oAuthUser = JSON.parse(localStorage.getItem('outhuser'));
    console.log('In reg ', oAuthUser);
    if(oAuthUser){
      this.Self.patchValue({
        name: oAuthUser.name,
        email: oAuthUser.email
      });
      this.Self.controls['email'].disable();
      console.log('after patch value');
      localStorage.clear();
      
    }
  }



  ngAfterContentInit() {
    let pattern1 = "^[0-9_-]{10,12}";
    this.Self = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phone: ['', [Validators.required, Validators.pattern(pattern1)]],
      gender: ['', Validators.required],
      DOB: ['', Validators.required],
      place: ['', Validators.required],
      occupation: ['', Validators.required],
      schoolName: [''],
      organisation:['']

    });

    this.loadOauthUser();
  }

  ngOnInit(): any {

  }
  ionViewDidEnter(){

    this.Selectedevents =  (JSON.parse(localStorage.getItem('SelectedEvents')))
    if(this.Selectedevents == null){

    }else{

    }

  }

  navLogin() {
    this.navCtrl.push("LoginPage");
  }

  Home() {
    this.navCtrl.setRoot("HomePage");
  }
  displayToast(message: string, duration: number) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  NumberValidation(value: any) {
    //  console.log(value.length)
    if (value.length <= 9) {
      this.nubervalidatin = true
    } else {
      this.nubervalidatin = false
    }

  }

  EmailValidator() {
    console.log(this.Self.value.email)

    var emailval = (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)

    if (this.Self.value.email.match(emailval)) {
      this.EmailErrorMessage = false
    } else if (this.Self.value.email.trim() == "") {
      this.EmailErrorMessage = false
    }
    else {
      this.EmailErrorMessage = true
    }

  }

  doSometing(ev) {
    console.log(ev)
  }

  selectOccupation(event: any) {
    console.log(event)
    if (event == "Student") {
      this.dislayschool = true
    } else {
      this.dislayschool = false
    }

  }

  NextButton() {



    console.log(this.Self.value)
    // this.navCtrl.push("RegistrationSecondPage"); 
    if (this.Self.value.email == "") {
      this.Self.value.emailCheck = false
    } else {
      this.Self.value.emailCheck = true
    }
    this.showPhoneErrorMessage = false
    //this.Self.value.phone = 91 + this.Self.value.phone
   // this.Self.value.country = this.Self.value.country + this.Self.value.phone
     if(this.Self.value.occupation == "Student" ){
        if( this.Self.value.schoolName == ""){
             this.entersschoolName = true
        }
        else{

          let mobilenumber = ''
             mobilenumber = 91+this.Self.value.phone
          this.registrationService.ValidateUser(mobilenumber).subscribe(data => {
              console.log(data)
            if (data.message == "Continue Registration.") {
               // localStorage.setItem('SelectedEvents', JSON.stringify(this.Self.value));
               let Obj = {}
               Obj = this.Self.getRawValue()

                  console.log("................")
                  console.log(Obj)
                 if(this.Self.value.emailCheck == true){
                  var emailval =  (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
                  if(this.Self.value.email.match(emailval)){
                    this.EmailErrorMessage = false
                    this.navCtrl.push("Registraion4Page", { RegisterDetails: Obj })
                 }else{
                  this.EmailErrorMessage = true
                 }
                }else{
                  this.EmailErrorMessage = false
                  this.navCtrl.push("Registraion4Page", { RegisterDetails: Obj })
                } 
             
            }
          }, (error) => {
            console.log("error")
            this.showPhoneErrorMessage = true
          })
        }

     }else{


      let mobilenumber = ''
         mobilenumber = 91+this.Self.value.phone

      this.registrationService.ValidateUser(mobilenumber).subscribe(data => {
        if (data.message == "Continue Registration.") {
            let Obj = {}
            Obj = this.Self.getRawValue()
            if(this.Self.value.emailCheck == true){
              var emailval =  (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
              if(this.Self.value.email.match(emailval)){
                this.EmailErrorMessage = false
                this.navCtrl.push("Registraion4Page", { RegisterDetails: Obj })
             }else{
              this.EmailErrorMessage = true
             }
            }else{
              this.EmailErrorMessage = false
              this.navCtrl.push("Registraion4Page", { RegisterDetails: Obj })
            } 
          //this.navCtrl.push("Registraion4Page", { RegisterDetails: Obj})
        }
      }, (error) => {
        console.log("error")
        this.showPhoneErrorMessage = true
      })

     }

   



  }

}
