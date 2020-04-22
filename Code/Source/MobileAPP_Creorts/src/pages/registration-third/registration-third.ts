import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Thumbnail } from 'ionic-angular';
import {FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';

import {RegistrationService} from '../registration/registration.service';
import {ToastController} from 'ionic-angular';

/**
 * Generated class for the RegistrationThirdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration-third',
  templateUrl: 'registration-third.html',
  providers:[RegistrationService],
})
export class RegistrationThirdPage {

  TeamForm:FormGroup;

  formdata:any
  
  players:any=[{}]
  extraIngredients: [{}]
  
  playersList:any=[{}]
  
  teamdetails:any={}

  dispalyTeamerrorMessage:boolean = false
  dispalyTeameMemberError:boolean = false

  TeamMembervalidation:boolean = false
  nubervalidatin: boolean = false
  displayteamsizeerroer:boolean = false
  constructor(public navCtrl: NavController,  private fb: FormBuilder, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public registrationService: RegistrationService, public navParams: NavParams) {
    console.log(this.navParams.data)
      this.formdata = this.navParams.data
      console.log(this.formdata)
  }


  ngOnInit(): any {

    this.TeamForm = this.fb.group({
      name: ['', Validators.required],
      Mobile: ['', Validators.required],
      gender:['',Validators.required] ,
      DOB:['',Validators.required],
  });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationThirdPage');
  }

  

  NumberValidation(value: any,list:any) {
    //  console.log(value.length)
    if (value.length <= 9) {
      list.mobilevalidation = true
    } else {
      list.mobilevalidation = false
    }

  }

  

  Back(){
    this.navCtrl.pop()
  }


  getNunmberInput(value:any){

    this.players=[]
    var obj={
      name:'',
      DOB:'',
      phone:'',
      position:'',
    }
    for(let i=0;i<value;i++){
      this.players.push(obj)
    }

   let Obj2 = {
    name:'',
    price:'',
   
   }
   for(let i=0;i<value;i++){
    this.extraIngredients.push(Obj2)
  }
    this.extraIngredients.length = value

    //this.players.push(obj)
    // console.log(value)
    // console.log(this.players)
    // this.players.length = value

  }

  SaveTeam(){


  //console.log(this.TeamForm.valid)
  //console.log(this.TeamForm.value)


    console.log(this.players)
    console.log(this.teamdetails)

     console.log(this.extraIngredients)

        this.teamdetails.teamMembers = this.players
 
     let obj ={
      teamdetails:{}
     }

     console.log(this.teamdetails)
     if(this.teamdetails.TeamName == undefined || this.teamdetails.TeamCaptain == undefined){
       console.log("team name and patain undefind")
       this.dispalyTeamerrorMessage = true
     }
        else if ( this.teamdetails.teamMembers.length ==  0 ){
          this.dispalyTeameMemberError = true
          this.dispalyTeamerrorMessage = false
        }

       
     else{
      this.dispalyTeamerrorMessage = false
      this.dispalyTeameMemberError = false
      console.log("team details")
      console.log(this.players)
      for(let k=0;k<this.players.length;k++){
        if(this.players[k].name == undefined ||  this.players[k].name.trim() == ""){
          this.TeamMembervalidation = true
          this.displayToast('Please fill in the Name field', 1500);
          break
        }else if( this.players[k].DOB == undefined  ||  this.players[k].DOB == ""){
          this.displayToast('Please fill in the DOB field', 1500);
          this.TeamMembervalidation = true
          break
        }else if(this.players[k].Mobile == undefined || this.players[k].Mobile == null ||  this.players[k].Mobile.trim() == ""  ||  this.players[k].Mobile.length <= 9 ){
          this.displayToast('Please fill valid Mobile Number', 1500);
          this.TeamMembervalidation = true
          break
        }else if(this.players[k].position == undefined ||  this.players[k].position.trim() == ""){
          this.displayToast('Please fill in the Position field', 1500);
          this.TeamMembervalidation = true
          break
        }else{
          this.TeamMembervalidation = false
        }
      }

      

      this.formdata.eventdata.teamdetails = this.teamdetails

     console.log(this.TeamMembervalidation)
     if(this.TeamMembervalidation == false){
       if( this.players.length < this.formdata.eventdata.teamSize ){  
          this.displayteamsizeerroer = true
       
       }else{
        this.displayteamsizeerroer = false
        for(let l=0;l<this.players.length;l++){
          this.players[l].Mobile = 91+this.players[l].Mobile
        }
        localStorage.setItem('Events', JSON.stringify(this.formdata.eventdata));
        this.navCtrl.pop()
       }
     }else{
     // this.displayToast('Please fill in required field', 1500);
     }
     
     }

    
  }
 
  ionViewWillLeave() {
    // console.log("jdfnklasd")
    //   console.log(this.formdata.eventdata)
    //   if(this.formdata.eventdata.teamdetails == undefined){
    //     localStorage.setItem('Events', JSON.stringify(this.formdata.eventdata));
    //     console.log("there is no team teatils")
    //   }
    }


  addNew = function () {
    var newItemNo = this.players.length + 1;
    this.players.push({});
  };

  delete= function () {
    if (this.players.length > 0) {
      var lastItem = this.players.length - 1;
      this.players.splice(lastItem);
    }
  }


  displayToast(message: string,duration: number){
    let toast = this.toastCtrl.create({
                message: message,
                duration: duration
            });
            toast.present();

}

  
}
