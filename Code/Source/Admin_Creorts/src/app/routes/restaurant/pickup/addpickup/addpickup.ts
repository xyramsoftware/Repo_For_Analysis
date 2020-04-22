import {Component,ViewChild} from '@angular/core';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import {ToastrService} from 'toastr-ng2';
import {cloudinarUpload} from '../../../../cloudinary.config';
import {PickupItemsService} from '../pickup.service';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {ReportmodalComponent} from '../../OrderModal/ordermodal'

import { DateRangePickerDirective } from '../../../../shared/directives/dateRange.picker.directive';
import * as moment from 'moment';

import {ConstantService} from '../../../../constant.service';
//import { DatepickerModule as YourAlias } from 'angular2-material-datepicker'

@Component({
  selector: 'app-add-pickup',
  templateUrl: './addpickup.html',
  styleUrls: ['./addpickup.scss'],
  providers: [PickupItemsService]
})
export class AddPickupComponent {

 
   PrescriptionDetails: any = {};
   image:any
   public loading:boolean = true;
   public url: any = 'assets/img/upload.png';
   public carousels: any = {}
   public isLoading: boolean = false;
   filesToUpload:any
   filename:any
   uploadform:any
   filesize:any
   imageuplaoderroer:boolean = false

   uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(cloudinarUpload)
  );

  constructor(public toastr: ToastrService,
               private route: ActivatedRoute,
              public router: Router,
              public modal: Modal, 
              public constantService: ConstantService,
              public PickupItemsService: PickupItemsService) {

                this.uploader.onAfterAddingFile = (item: any) => {
                  item.url = this.uploader.options.url;
                  return item;
                };
               

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


  fileChange(fileInput: any) {
    
    // let formdata= new FormData();
     this.filesToUpload = <Array<File>>fileInput.target.files;
     
      this.filename =   this.filesToUpload[0];
      this.filesize = this.filesToUpload[0].size
        console.log(this.filename)
         console.log(this.uploadform)
   
 }


 onSubmit(){
   console.log(this.carousels)
   
    console.log(this.filename)
 
    if(this.filename !== undefined){
      this.imageuplaoderroer = false
    let formdata= new FormData();
    formdata.append('images', this.filename);
    formdata.append('title',this.carousels.title)
    this.uploadform = formdata
    this.PickupItemsService.GalleryUpload(this.uploadform).subscribe(data=>{
      console.log(data)
      this.toastr.success('Gallery Added Successfully!', 'Success!');
      this.router.navigate(['/prescriptions/prescriptions']);
    })
 }else{
    this.imageuplaoderroer = true
 }
}


cancel(){
  this.router.navigate(['/prescriptions/prescriptions']);

  
}
 
 


  




   
}
