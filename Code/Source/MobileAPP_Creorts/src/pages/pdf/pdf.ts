import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController} from 'ionic-angular';
//import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

import { ContactService } from '../contact/contact.service';


/**
 * Generated class for the PdfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdf',
  templateUrl: 'pdf.html',
  providers:[ContactService]
})
export class PdfPage {
  private loader:any;
  src:any
  displahfeedback:boolean = true
  Organizationrate:any
    eventrate:any
    likedmost:any
    likedleast:any
    Bringinglife:any
    experience:any
    nextsportival:any    
    feedbackdata:any=[]
    eventdata:any={}
    UserDetails:any

    checkedIdx:any;
    checkedIdx1:any;
    options = [
      'Excellent',
      'Good',
      'Satisfactory',
      'Poor',
      'Not Applicable'
    ];

    options1 = [
      'Excellent',
      'Good',
      'Satisfactory',
      'Poor',
      'Not Applicable'
    ]
  displaypdf:boolean = false
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private contactService:ContactService,
    public viewCtrl:ViewController,
    private loadingCtrl:LoadingController) {

        console.log(this.navParams.data)
        this.eventdata = this.navParams.data.eventdata
        console.log(this.eventdata)

      // this.src= this.navParams.data.PDF
      // console.log(this.src)
      // const options: DocumentViewerOptions = {
      //   title: 'My PDF'
      // }
      // this.document.viewDocument(this.src, 'application/pdf', options)
  
      this.UserDetails   = JSON.parse(localStorage.getItem('userdetails'));
      this.loader = this.loadingCtrl.create({
        content:'please wait'
    })
    this.loader.present();

      this.getfeedbackdata()

    //   this.loader =this.loadingCtrl.create({
    //     content:'please wait'
    // })
    // this.loader.present();
    
    this.displaypdf = true
    //this.loader.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PdfPage');
  }

  getfeedbackdata(){

    this.contactService.GetAllFeedbackByEvent(this.UserDetails._id,this.eventdata._id).subscribe(data=>{
      this.loader.dismiss();
      if(data.length  !==0){
        this.feedbackdata = data[0]
        console.log(this.feedbackdata)
        this.displahfeedback =  false
      }
    })

  }

  rateOrganization(event:any){

    console.log(event)
    this.Organizationrate = event

    
  }

  rateEvent(event:any){
     console.log(event)
     this.eventrate = event
  }


  Submit(){


    let Obj={
      rateOrganization: this.Organizationrate,
      rateEvent:this.eventrate,
      positiveComments:this.likedmost,
      negativeComments:this.likedleast,
      userID:this.UserDetails._id,
      EventName: this.eventdata.title,
      EventID:this.eventdata._id,
      userInfo:[{
         name:this.UserDetails.name,
         phone:this.UserDetails.phone
      }]
    }


    //http://localhost:3000/api/eventfeedback/create/:userID/:EventID

      if(Obj.rateOrganization !== undefined && Obj.rateEvent !== undefined ){

        console.log("data is there")
        this.contactService.CreateFeedbackEvent(Obj,this.UserDetails._id,this.eventdata._id).subscribe(data=>{
          console.log(data)
         //this.gettigfeedback()
         this.getfeedbackdata()
          this.displahfeedback =  false
        })
        
      }else{
       
      }
     
    console.log(Obj)


  }

}
