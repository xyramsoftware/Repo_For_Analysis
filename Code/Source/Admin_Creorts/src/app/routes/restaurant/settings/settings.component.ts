import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';
import { SettingsService } from './settings.service';
import { ConstantService } from '../../../constant.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [SettingsService]
})
export class SettingsComponent implements OnInit {
  public headersettings = {
    headercolor: '#ffff',
    dashicon:''
  };
  public Appsettings = {
    headercolor: '#ffff',
    appicon:''
    
  };
  uploadform:any
  uploadform1:any
  filename:any
  filesToUpload:any
  
  color:any=[]
  Appcolor:any =[]
  iconDisplay:string
  displayupdatebutton:boolean = true
  displayupdatebutton1:boolean = true
  uploadimage:boolean
  showErrorMessageOnDashboardImage:boolean = false
  showErrorMessageOnDashboardImage1:boolean = false
  filename1:any
  filesToUpload1:any
  uploadimage1:boolean
  public url: any = 'assets/img/upload.png';
  public url1: any = 'assets/img/upload.png';
  public contactsettings = {
    email: '',
    phoneNo: ''
  };
  private _id: any;
  private isFirstTime: boolean;
  public isLoading: boolean = false;
  public loading: boolean = true;
  tax: any;
  clientid:any
  constructor(
    public toastr: ToastrService,
    public settingsService: SettingsService,
    public constantService: ConstantService
  ) {
    console.log('settings constructior');
    this.gettingAppSettings()
  }

  ngOnInit() {
    //this.getSettingDetail(); //call setting detail function
    // alert("on in int")
    //this.getcontactsetting();
     this.clientid = localStorage.getItem('id')
     this.color = JSON.parse(localStorage.getItem('headercolor'));
     console.log(this.color)
     if(this.color !== null){
        if(this.color.length == 1){
          if(this.color[0].dashicon !== ""){
            this.headersettings.dashicon = this.color[0].dashicon
            this.url = this.constantService.API_ENDPOINT+"dashboard/dashicon/"+this.color[0]._id+'?clientID='+this.clientid+'&id='+this.color[0]._id+'&dashicon='+this.color[0].dashicon
            console.log(this.url)
          }
          this.displayupdatebutton = false
          this.headersettings.headercolor = this.color[0].headercolor
        }
     }
  }

  gettingAppSettings(){
    this.settingsService.gettingAppSettings().subscribe(data=>{
      console.log("app settings")
    
       this.Appcolor = data
       console.log(this.Appcolor)
       if(this.Appcolor.length ==1){
         this.url1=this.constantService.API_ENDPOINT+"appsettings/appicon/"+this.Appcolor[0]._id+'?clientID='+this.clientid+'&id='+this.Appcolor[0]._id+'&appicon='+this.Appcolor[0].appicon
         console.log(this.url1)
         this.Appsettings.headercolor = this.Appcolor[0].headercolor
         this.displayupdatebutton1 = false
       }
    })
  }

 
  

  fileChange(fileInput: any){
    this.showErrorMessageOnDashboardImage = false
    let formdata= new FormData();
    this.filesToUpload = <Array<File>>fileInput.target.files;
    
     this.filename =   this.filesToUpload[0];

    
console.log(this.filename.name)
console.log(this.filename)
      
        formdata.append('dashicon', this.filename);
        this.uploadform = formdata
        console.log(this.uploadform)

     //   this.uploadImage()

  }


  uploadImage(){

      this.settingsService.updateDashBoardImageData(this.uploadform,this.color[0]._id).subscribe(data=>{
        console.log(data.text())
        this.headersettings.dashicon = data.text()
         console.log(this.headersettings)
        
         console.log(this.color)
         this.setheadcolorUpdate()
     
      })
  }


  setheadcolorUpdate1(){
    this.uploadImage()
  }

  readUrl(event: { target: { files: Blob[]; }; }) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: any) => {
        this.url = event.target.result;
       
      };
  
      reader.readAsDataURL(event.target.files[0]);
      
    }
  }
  onSubmitContactSetting(form: NgForm) {
    
  }

  setheadcolor(){

     //console.log(this.headersettings)
     this.showErrorMessageOnDashboardImage = false
      console.log(this.filename)
      if(this.filename !== undefined){
     
     this.settingsService.PostDashBoardSettings(this.headersettings).subscribe(data=>{
       console.log(data)
       localStorage.setItem('headercolor', JSON.stringify([data]));
       this.color = [data]
       this.displayupdatebutton = false
       this.uploadImage()
     })
     }else{
       this.showErrorMessageOnDashboardImage = true
     }

  }

  setheadcolorUpdate(){
     //console.log(this.color)
   
        console.log(this.headersettings)

     this.settingsService.updateDashBoardData(this.headersettings,this.color[0]._id).subscribe(data=>{
       console.log(data)
      localStorage.setItem('headercolor', JSON.stringify([data]));
     // localStorage.setItem('headercolor', JSON.stringify([data]));
      let url = this.constantService.API_ENDPOINT+"dashboard/dashicon/"+data._id+'?clientID='+this.clientid+'&id='+data._id+'&dashicon='+data.dashicon
     console.log(url)
     localStorage.setItem('headerIcon', JSON.stringify([url]));
    })

  }

 


  fileChange1(fileInput: any){
    // alert("App image file upload")
    this.showErrorMessageOnDashboardImage1 = false
    let formdata= new FormData();
    this.filesToUpload1 = <Array<File>>fileInput.target.files;
    
     this.filename1 =   this.filesToUpload1[0];

    
console.log(this.filename1.name)
console.log(this.filename1)
      
        formdata.append('appicon', this.filename1);
        this.uploadform1 = formdata
        console.log(this.uploadform1)

        //this.UploadAppIson()

  }
  readUrl1(event: { target: { files: Blob[]; }; }) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: any) => {
        this.url1 = event.target.result;
       
      };
  
      reader.readAsDataURL(event.target.files[0]);
      
    }
  }

  setheadcolor1(){
  // alert("app save data api")
    //console.log(this.headersettings)
    this.showErrorMessageOnDashboardImage1 = false
     console.log(this.filename1)
     if(this.filename1 !== undefined){
    
    this.settingsService.PostAppsettings(this.Appsettings).subscribe(data=>{
      console.log(data)
     // localStorage.setItem('APPcolor', JSON.stringify([data]));
      this.Appcolor = [data]
       
      this.displayupdatebutton1 = false
      this.UploadAppIson()
    })
    }else{
      this.showErrorMessageOnDashboardImage1 = true
    }

 }


 UploadAppIson(){

  this.settingsService.updateAppImageData(this.uploadform1,this.Appcolor[0]._id).subscribe(data=>{
    console.log(data.text())
    
    this.Appsettings.appicon = data.text()
     console.log(this.headersettings)
    
     console.log(this.Appcolor)
      this.updateAppSettings()
 
  })
}

updateAppSettings(){
  
   this.settingsService.updateAppSettingsData(this.Appsettings,this.Appcolor[0]._id).subscribe(data=>{
      console.log(data)
      this.toastr.success("App Aettings Date is Updated","Updated !");
   })

}


setheadcolorUpdate12(){
  this.UploadAppIson()
}
  
}
