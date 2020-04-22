import {Component} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {NgForm} from '@angular/forms';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {ToastrService} from 'toastr-ng2';
import {cloudinarUpload} from '../../../../cloudinary.config';
import {CategoriesService} from '../categories.service';
import { from } from 'rxjs/observable/from';
import * as moment from 'moment';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  providers: [CategoriesService]
})
export class EditCategoryComponent {
  public url: any = '';
  public categoryDetails: any = {};
  private categoryId: any;
  public isLoading: boolean = false;
  speErroMessage:boolean = false

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  testcode:any;
  testtitle:any;
  testtype:any;
  testdescription:any;
  preTestInfo:any;
  TestPrice:any;
  ReportDelivery:any
  testSpecimen:any
  testselect:any

  testpayload:any={}
  filename:any

  filesToUpload:any
  file:any
  uploadform:any

  CategoryString:any
  selectcomponent:any
  comptoSelected:any=[]
  
  CategoryData:any=[]
  displaycategoryerror:boolean=false
  testalldata:any
  selectcomponentdata:any=[]
  movedcomponentdata:any=[]
  movecomp:any=[]
  removecomponentdata:any=[]
  removecomp:any=[]
  pushdata:any=[]
  appointment:any
  nextdata:any
  testdatalenght:any
  currntindex:any
  nesxtdusable:boolean = false
  previousdusable:boolean=false
  editedtestIndex:any
  nextindex:number = 0
  selecetedtestIndex:number
  testnumber:number
  public loading:boolean = true;
  eventdates:any[]
  Dates:any=[]
  selectedEventdate: any 
  selectedEventdate1:any
  eventTypeList:any=[]
  eventtypeName:any=[]
  CategoryList:any=[]
  category:any=[]
  selectCategoryDate:any
  PDFName:any
  uplaodPDFOnly:boolean = false
  filesToUpload1:any
  filename1:any
  uploadform1:any
  selectPaymentGateway:any
  displaypricing:boolean = false
  public url1: any = 'assets/img/upload.png';
  public menuItems = {
    
      component: [{}],
    
   }
   selectedEventType:any
   ///////////////////////////////////////
   selectedEventDate:any
    

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(cloudinarUpload)
  );

  constructor(private route: ActivatedRoute,
              public router: Router,
              public toastr: ToastrService,
              public categoriesService: CategoriesService) {
                this.getEventDates()
               // this.getEvetnCategoryData()
               // this.getEventType()
    this.route.params.map(params => params['id']).subscribe((id) => {
      if (id != null) {
        this.categoryId = id;
        // console.log(this.categoryId)
        this.getCategoryData(id);         //get single category data function call
      }
    });
    this.uploader.onBeforeUploadItem = (item: any) => {
      item.url = this.uploader.options.url;
      localStorage.setItem("image", "image Is going");
      return item;
    };
  }

  getEventDates(){
    this.categoriesService.getEventDates().subscribe(data=>{
      console.log(data)
      this.eventdates = data
      for(let i=0;i<this.eventdates.length;i++){
          this.Dates.push(this.eventdates[i].EventDate)
      }
    })
  }

  getEvetnCategoryData(){
    this.categoriesService.getCatogory().subscribe(data=>{
      this.CategoryList = data
      console.log(this.CategoryList)
      for(let i=0;i<this.CategoryList.length;i++){
         if(this.categoryDetails.CategoryID  == this.CategoryList[i]._id){
             this.selectCategoryDate = this.CategoryList[i].categoryName
         }
        this.category.push(this.CategoryList[i].categoryName)
    }
    })

  }

  getEventType(){
    this.categoriesService.getEventType().subscribe(data=>{
      console.log(data)
      this.eventTypeList = data
      for(let i=0;i<this.eventTypeList.length;i++){
        if(this.categoryDetails.EventTypeID == this.eventTypeList[i]._id){
          this.selectedEventType = this.eventTypeList[i].eventTypeName
          console.log(this.selectedEventType)
        }
        this.eventtypeName.push(this.eventTypeList[i].eventTypeName)
    }
    })
  }

  getCategoryData(id) {                     //get single category data function body
    this.categoriesService.getEventById(id)
      .subscribe(response => {
        this.loading = false
       console.log(response)
        this.categoryDetails = response;
        if(this.categoryDetails.paymentGateway == false){
          this.selectPaymentGateway = "No"
        }else{
          this.selectPaymentGateway = "Yes"
          this.displaypricing = true
        }
        this.selectedEventdate = this.categoryDetails.EventDate
        let dt = moment(this.selectedEventdate).format('MMM DD,YYYY');
        console.log(dt)
        this.selectedEventdate = dt
        this.getEventType()
        this.getEvetnCategoryData()
      })
  }

  getallcatgerydata(){
    this.categoriesService.getCategoryData().subscribe(data=>{
      console.log(data)
      // this.CategoryData=[]
      //this.displaycategory=false
      this.CategoryData = data
      let index = 0
      for(let i=0;i<this.CategoryData.length;i++){
        index++
        this.CategoryData[i]['id'] = index 
        this.CategoryData[i]['itemName'] = this.CategoryData[i].title
      }
      this.displayCategoryDateDroupdwon()
   })
  }


  
    
  TesttypeSelect(itemtype:any){
    
        console.log(itemtype)
       //this.testselect=itemtype
     this.categoryDetails.selector = itemtype
    
      } 

      Testappointment(itemappoint:any){
        console.log(itemappoint)
        this.categoryDetails.appointment = itemappoint
      }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubTestItems(form: NgForm) {
   // console.log(form.value)
   
    this.isLoading = !(this.isLoading);
    

      for(let i=0;i<this.eventTypeList.length;i++){
        if(this.categoryDetails.EventTypeID == this.eventTypeList[i]._id){
          this.categoryDetails.EventTypeName = this.eventTypeList[i].eventTypeName
        }
      }
      for(let i=0;i<this.CategoryList.length;i++){
        if(this.categoryDetails.CategoryID == this.CategoryList[i]._id){
          this.categoryDetails.categoryName = this.CategoryList[i].categoryName
        }
      }


      //this.categoryDetails.teamMemberCount = 0
      //this.categoryDetails.accompanyCount = 0
      //this.categoryDetails.ticketsCount = 0
      //this.categoryDetails.userCount = 0

      console.log(this.categoryDetails)
     
     this.categoriesService.updateEventById(this.categoryDetails,this.categoryDetails._id).subscribe(data=>{
       console.log(data)
       this.isLoading = !(this.isLoading);
       this.toastr.success('Event Updated Successfully!', 'Success!');
       this.router.navigate(['/Events/manageindividualEvents']);
     },(error)=>{
           this.isLoading = !(this.isLoading);
           this.toastr.error("Error....");
         })
   
  
  }


  addNewPrice = function () {
    var newItemNo = this.menuItems.component.length + 1;
    this.menuItems.component.push({});

  };

  removePrice = function () {
    if (this.menuItems.component.length > 1) {
      var lastItem = this.menuItems.component.length - 1;
      this.menuItems.component.splice(lastItem);
    }
  }

  cancel() {
    this.router.navigate(['/Events/manageindividualEvents']);
  }

  ////////////////////////////////////////


  selectedcomponent(comp){
    
    
        console.log(comp)
    
         if(comp.selectedcomp == false){
           comp.selectedcomp = true
           this.movedcomponentdata.push(comp)
           
         }else{
          comp.selectedcomp = false
          
          for(let i=0;i<this.movedcomponentdata.length;i++){
            if(this.movedcomponentdata[i]._id == comp._id){
              this.movedcomponentdata.splice(i,1)
            }
          }
         }
    
        // console.log(this.movedcomponentdata)
     
    }
    
    clickmovecomponent(){
    
      for(let i=0;i<this.movedcomponentdata.length;i++){
        this.comptoSelected.unshift(this.movedcomponentdata[i])
      }
    
       //console.log(this.comptoSelected)
     
      for(let i=0;i<this.comptoSelected.length;i++){
        for(let j=0;j<this.selectcomponentdata.length;j++){
          this.selectcomponentdata[j].selectedcomp = false
          if(this.comptoSelected[i]._id == this.selectcomponentdata[j]._id){
            this.selectcomponentdata.splice(j,1)
          }
        }
      }
    
     this.movedcomponentdata=[]
    // console.log(this.comptoSelected)
    
    }
    
    
    selectremovecomponent(comp){
    
      if(comp.removedcomp == false){
        comp.removedcomp = true
        this.removecomponentdata.push(comp)
        
      }else{
       comp.removedcomp = false
       //this.movedcomponentdata.splice(comp)
       for(let i=0;i<this.removecomponentdata.length;i++){
         if(this.removecomponentdata[i]._id == comp._id){
           this.removecomponentdata.splice(i,1)
         }
       }
      }
     // console.log(this.removecomponentdata)
     
    }
    
    clickremovecomponent(){
    
    
      for(let i=0;i<this.removecomponentdata.length;i++){
        this.selectcomponentdata.unshift(this.removecomponentdata[i])
    
      }

       for (let i=0;i<this.selectcomponentdata.length;i++){
        this.selectcomponentdata[i].removedcomp = false
        for(let j=0;j<this.comptoSelected.length;j++){
          if(this.selectcomponentdata[i]._id == this.comptoSelected[j]._id){
            this.comptoSelected.splice(j,1)
          }
        }
       }
    
       this.removecomponentdata = []
    }

    // fileChange(fileInput: any) {
      
    //   let formdata= new FormData();
    //   this.filesToUpload = <Array<File>>fileInput.target.files;
      
    //    this.filename =   this.filesToUpload[0];
      
    //       // console.log(this.filename)
        
    //       formdata.append('files', this.filename);
    //       this.uploadform = formdata
    //      // console.log(this.uploadform)
    //          this.upload()
    //       }

          // upload(){
          //     //  console.log(this.filename.name) 
          //       this.categoryDetails.filenames = this.filename.name
          //          this.categoriesService.sampleTestReport(this.categoryDetails.code,this.uploadform).subscribe(data=>{
          //          //   console.log(data)
          //         })
          //         }

   ////////////////////////////////
    ////////////////////
 displayCategoryDateDroupdwon(){
  this.dropdownList = this.CategoryData
  // console.log(this.dropdownList)
  this.selectedItems = this.categoryDetails.categoryTitle
  this.dropdownSettings = { 
                            singleSelection: false, 
                            text:"Select Category",
                            selectAllText:'Select All',
                            unSelectAllText:'UnSelect All',
                            enableSearchFilter: true,
                            classes:"myclass custom-class"
                          };            
}
onItemSelect(item:any){
  console.log(item);
  this.displaycategoryerror = false
 // console.log(this.selectedItems2);
}
OnItemDeSelect(item:any){
  console.log(item);
  //console.log(this.selectedItems2);
}
onSelectAll(items: any){
  console.log(items);
}
onDeSelectAll(items: any){
  console.log(items);
}     


fileChange(fileInput: any){

  let formdata= new FormData();
  this.filesToUpload = <Array<File>>fileInput.target.files;
  
   this.filename =   this.filesToUpload[0];

   let fileName = this.filename.name;
   this.PDFName = fileName
   console.log(fileName)
             var extn = fileName.split(".").pop();
             console.log(extn)
             if(extn == 'pdf'|| extn == 'PDF'){
              this.uplaodPDFOnly = false
              formdata.append('eventspdf', this.filename);
              this.uploadform = formdata
              console.log(this.uploadform)
             }else{
              console.log("not pdf ")
               this.uplaodPDFOnly = true
             }

    }


    fileChange1(fileInput: any){
      // alert("App image file upload")
      //this.showErrorMessageOnDashboardImage1 = false
      let formdata= new FormData();
      this.filesToUpload1 = <Array<File>>fileInput.target.files;
      
       this.filename1 =   this.filesToUpload1[0];
  
      
       console.log(this.filename1.name)
       console.log(this.filename1)
        
          formdata.append('image', this.filename1);
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
  
    selectPaumentGetwaydata(event:any){
    
      console.log(event)
      if(event  ==  "yes"){
       this.displaypricing = true
       this.categoryDetails.paymentGateway = true
      }else{
        this.displaypricing = false
        this.categoryDetails.paymentGateway = false
        this.categoryDetails.price = ""
      }
      
       console.log(this.categoryDetails)
         
    }

    selectEventDate(eventdate:any){
         console.log(eventdate)
         this.categoryDetails.EventDate = eventdate.EventDate
    }
    selectEventType(eventType:any){
   this.categoryDetails.EventTypeID = eventType._id
   this.categoryDetails.EventTypeName = eventType.eventTypeName
    }

    selectCategoryType(eventcategory:any){
    this.categoryDetails.CategoryID = eventcategory._id
    this.categoryDetails.categoryName = eventcategory.categoryName
    console.log(this.categoryDetails)
    }
    
}
