import {Component,OnInit} from '@angular/core';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import {ToastrService} from 'toastr-ng2';
import {cloudinarUpload} from '../../../../cloudinary.config';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CategoriesService} from '../categories.service';


import {Common} from '../../common'
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss'],
  providers: [CategoriesService]
})
export class AddCategoriesComponent implements OnInit {

  

  
  items:any
  timepicker:any
  //public EventDetails: any = {};
  EventDetails: FormGroup;
  EventDate:any
  eventdates:any[]
  selectedEventdate: any = 0

  selectedEventType:any=0
  selectCategoryDate:any = 0
  Dates:any=[]
  CategoryList:any=[]
  eventTypeList:any=[]
  category:any=[]
  eventtypeName:any=[]
  public url: any = 'assets/img/upload.png';
  filename:any
  filesToUpload:any
  uploadform:any
  uplaodPDFOnly:boolean = false
  PDFName:any
  eventData:any
  updatePdfdata:any
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(cloudinarUpload)
  );

  constructor(public router: Router,
              public toastr: ToastrService,
              public fb: FormBuilder,
              public categoriesService: CategoriesService) {
              this.getEventDates()
              this.getCategoryData()
              this.getEventType()
   
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

  getCategoryData(){
    this.categoriesService.getCatogory().subscribe(data=>{
      this.CategoryList = data
      console.log(this.CategoryList)
      for(let i=0;i<this.CategoryList.length;i++){
        this.category.push(this.CategoryList[i].categoryName)
    }
    })

  }

  getEventType(){
    this.categoriesService.getEventType().subscribe(data=>{
      console.log(data)
      this.eventTypeList = data
      for(let i=0;i<this.eventTypeList.length;i++){
        this.eventtypeName.push(this.eventTypeList[i].eventTypeName)
    }
    })
  }

  cancel() {
    this.router.navigate(['/Events/manageindividualEvents']);
  }
//////////////////////////////////////////////////////////////////////////
ngOnInit(){

  this.EventDetails = this.fb.group({
    'title': ['', Validators.required],
    'description': [''],
    'EventDate':['',Validators.required],
    'location':[''],
    'startTime':['',Validators.required],
    'endTime':['',Validators.required],
    'Category':['',Validators.required],
    'eventType':['',Validators.required] 
  });


}


onSubEvent(Form:any){

console.log(this.EventDetails.value)
//onsole.log(this.EventDate)
 let Obj={
  title:this.EventDetails.value.title,
  description:this.EventDetails.value.description,
  EventDate:this.EventDetails.value.EventDate.EventDate,
  location:this.EventDetails.value.location,
  startTime:this.EventDetails.value.startTime,
  endTime:this.EventDetails.value.endTime,
  EventDateID:this.EventDetails.value.EventDate._id,
  CategoryID:this.EventDetails.value.Category._id,
  EventTypeID:this.EventDetails.value.eventType._id
}
console.log(Obj)
console.log(this.filename)
  this.categoriesService.addEventData(Obj).subscribe(data=>{
        this.eventData =  data
     if(this.filename !== undefined){
       
      this.uplaodPdf()


     }else{
      this.toastr.success('Event Created Successfully!', 'Success!');
      this.router.navigate(['/Events/manageindividualEvents']);
     }

    
  })
  
}


      uplaodPdf(){
        let formdata= new FormData();
        formdata.append('eventspdf', this.filename);
        this.uploadform = formdata
        this.categoriesService.EventPDFUpload(this.eventData._id,this.uploadform).subscribe(data=>{
          console.log(data.text())
          this.updatePdfdata = data.text()
          this.eventData.eventspdf = this.updatePdfdata
           console.log(this.eventData)
       // this.isLoading = !(this.isLoading);
          this.updateEventData(this.eventData)
        //this.toastr.success('Curasouls Image Added Successfully!', 'Success!');
        //this.router.navigate(['/carousels/manageCarousels']);
        })
      }

      updateEventData(eventData:any){


        this.categoriesService.updateEventById(eventData,eventData._id).subscribe(data=>{
          console.log(data)
          this.toastr.success('Event Created Successfully!', 'Success!');
          this.router.navigate(['/Events/manageindividualEvents']);

        })
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



}