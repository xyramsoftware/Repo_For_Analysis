import { Component, OnInit } from '@angular/core';
import { TableBookingService } from './table-booking.service';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'toastr-ng2';
const swal = require('sweetalert');
import { HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-table-booking',
  templateUrl: './table-booking.component.html',
  styleUrls: ['./table-booking.component.scss'],
  providers: [ TableBookingService ]
})
export class TableBookingComponent implements OnInit {
  fileSelected:any;
  
 

  constructor(private importService:TableBookingService,public toastr:ToastrService) { 
   
  }
  
 

  ngOnInit() {
  }
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  uploadSuccess = false;
  message:string
  submitted = false;
  formModel: FormModel= new FormModel();
   


  // downloadFile() {
  //   const link = document.createElement('a');
  //   link.setAttribute('target', '_blank');
  //   link.setAttribute('href', '_File_Saved_Path');
  //   link.setAttribute('download', 'file_name.pdf');
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  // }

  change($event) {
    this.uploadSuccess = false;
    this.changeImage = true;
  }

  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }

  upload(formModel) {
    this.submitted = true;
    console.log(this.formModel)
    if(this.formModel.message.length>0){
      this.progress.percentage = 0;
      this.currentFileUpload = this.selectedFiles.item(0);
      this.importService.pushFileToStorage(this.currentFileUpload,this.formModel.message).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          // this.uploadSuccess = true;
          // alert('File Successfully Uploaded');
          console.log(this.formModel.message)
          this.toastr.success('Upload Succesful');
        }
        this.selectedFiles = undefined;
      },
      error => {
        this.toastr.error('File is not of CSV type');
      }
      );
    }
    
  }
  
  selectFile(event) {
    this.selectedFiles = event.target.files;
    var files = event.srcElement.files;
    console.log(files);
    this.fileSelected = files.length>0;
  }
  onKeyPress(event) {
    console.log(event)
   console.log(event.key)
   if(event.key.match ('^[A-Za-z0-9]*$')){
    return true
   }else{
    return false
   }    
  }


  onChangeTime(event:any){

  }

}
export class FormModel {
  importfile: File;
  message:string;
 }