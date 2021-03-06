import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController,AlertController,ViewController,ToastController} from 'ionic-angular';
import {OrderStatusService} from './order-status.service';

@IonicPage()
@Component({
    selector: 'page-order-status',
    templateUrl: 'order-status.html',
    providers: [OrderStatusService]
})
export class OrderStatusPage {

   

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
   
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private loadingCtrl:LoadingController,
                public alertCtrl:AlertController,
                public viewCtrl: ViewController,
                public toastCtrl: ToastController,
                public orderStatusService: OrderStatusService) {

                    this.formdata = this.navParams.data
                     console.log(this.formdata)
       // this.orderId = this.navParams.get("orderId");
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OrderStatusPage');
        let loader =this.loadingCtrl.create({
            content:'please wait'
        })
        loader.present();
        loader.dismiss();
       
    }

    NumberValidation(value: any,list:any) {
        //  console.log(value.length)
        if (value.length <= 9) {
          list.mobilevalidation = true
        } else {
          list.mobilevalidation = false
        }
    
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
              }else if(this.players[k].Mobile == undefined ||  this.players[k].Mobile == null || this.players[k].Mobile.trim() == "" || this.players[k].Mobile.length <= 9 ){
                this.displayToast('Please fill Valid Mobile Number', 1500);
                this.TeamMembervalidation = true
                break
              }else if(this.players[k].position == undefined ||  this.players[k].position.trim() == ""){
                this.displayToast('Please fill in the Position field', 1500);
                this.TeamMembervalidation = true
                break
              }else{
                this.TeamMembervalidation = false
               // break
              }
            }
      
            // for(let l=0;l<this.players.length;l++){
            //   this.players[l].Mobile = 91+this.players[l].Mobile
            // }
      
            this.formdata.eventdata.teamdetails = this.teamdetails
            this.formdata.eventdata.donotrepete = true
           console.log(this.TeamMembervalidation)
           if(this.TeamMembervalidation == false){
   
               console.log(this.players.length)
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
          
           }
           
           }
      
          
        }
    


    closeModal() {
        this.viewCtrl.dismiss();
      } 

   

}
