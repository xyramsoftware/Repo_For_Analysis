import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController,NavController ,LoadingController } from '@ionic/angular';
import {PatientService} from './patient.service'
import {PopoverpagePage} from '../popoverpage/popoverpage.page'
import {DetailspagePage} from '../detailspage/detailspage.page'

@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.page.html',
  styleUrls: ['./patient-page.page.scss'],
  providers:[PatientService]
})
export class PatientPagePage implements OnInit {
  data: any;
  patientlist:any=[]
  items:any=[]
  alldata:any=[]
  TessandPakages:any[] = [];
  NodataFound:boolean=false
  PersonDetails:any={}
  loading:any
  isLoading:boolean=false
  constructor(private route: ActivatedRoute, private router: Router,public navCtrl: NavController,
    public popoverController: PopoverController,public PatientService:PatientService, public loadingController: LoadingController,
    public popoverCtrl: PopoverController) {

       console.log("patient list ")
  
    // this.route.queryParams.subscribe(params => {
    //   if (params && params.special) {
    //     this.data = JSON.parse(params.special);
    //     console.log("list of ptient data")
    //     console.log(this.data)
    //     this.getpatientdata()
    //   }
    // });
   }

  ngOnInit() {
    console.log("patient list ")
  //  this.NodataFound = false
  }
  ionViewWillEnter(){
    

    this.route.queryParams.subscribe(params => {
       console.log(params)
        // if (params && params.special) {
        //  console.log()
        // }
      });
      this.presentLoading()
    this.NodataFound = false
    
    this.PersonDetails = JSON.parse(localStorage.getItem('LoginDetails'));
    this.getpatientdata()
  }

  async presentLoading() {
    this.isLoading = true;
     this.loading = await this.loadingController.create({
      message: 'please wait',
      duration: 2000
    });
    this.loading.present();

     const { role, data } = await this.loading.onDidDismiss();

    console.log('Loading dismissed!');


  // return await this.loadingController.create({
  //  // duration: 5000,
  // }).then(a => {
  //   a.present().then(() => {
  //     console.log('presented');
  //     if (!this.isLoading) {
  //       a.dismiss().then(() => console.log('abort presenting'));
  //     }
  //   });
  // });
  
  }


  // async dismiss() {
  //   this.isLoading = false;
  //   return await this.loadingController.dismiss().then((a) => console.log('dismissed'));
  // }

  


  getpatientdata(){
    this.PatientService.getPatientList(this.PersonDetails._id).subscribe(data=>{
           console.log(data)
           this.patientlist = data
          // this.loading.onDidDismiss();
           this.alldata = this.patientlist
    })
 }


  initializeItems() {
    console.log("test first")
    this.items = this.patientlist
   
  }
  getItems(ev: any) {
      
    this.initializeItems();
 
    this.TessandPakages = this.alldata
   // console.log(this.TessandPakages)
    let val = ev.target.value;
    
    if(val == ''){
      this.TessandPakages = this.alldata
      //console.log(this.TessandPakages)
    }
    else if(val == undefined){
      this.TessandPakages = this.alldata
    } 
    // if the value is an empty string don't filter the items
    else  if (val && val.trim() != '') {
      console.log(val)
      console.log(this.items)
      this.TessandPakages = this.items.filter((item) => {
        var searchedText =  item['Firstname'] +item['Lastname']
         //console.log(searchedText)
        return (searchedText.toLowerCase().indexOf(val.toLowerCase()  ) > -1);
      })
    }

     console.log(this.TessandPakages)
    if(this.TessandPakages.length == 0){
    this.NodataFound = true
    }else{
     this.NodataFound = false 
    }
    this.patientlist =  this.TessandPakages
    //console.log(this.TessandPakages)
    //console.log(this.TessandPakages.length)
   
  }

  
  async presentPopover(ev: any) {
    //alert("jhsdfjkds")
    console.log(ev)
  const popover = await this.popoverController.create({
    component: PopoverpagePage,
    event: ev,
    translucent: true
  });
  return await popover.present();
 }

 selectedPatient(Patientdata:any){

  console.log(Patientdata)
  
  localStorage.setItem('PatientDetails', JSON.stringify(Patientdata));
  //this.navCtrl.navigateBack('/detailspage')
  this.router.navigate(['/detailspage'])

  

 }

 profilepage(){
  //this.navCtrl.navigateBack('/profile')
  this.router.navigate(['/profile'])
 }
 

}
