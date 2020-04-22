import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ChatService} from './chat.service';
import {userlist, chatData, showChat} from './chat';
import {Store} from '@ngrx/store';
import {ToastrService} from 'toastr-ng2';
import {NgForm} from '@angular/forms';
import {SocketSharedService} from '../../../SocketShare.service';
const swal = require('sweetalert');

declare var $: any;
import * as moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {
  Fields:any ={
    
   }

   payload:any=[]
  updatebutton :boolean = false
  displayfield:any=[
    
  ]
  selectedScreen: any = 0
  selectedFieldType:any = 0
  selectedFieldType1:any
  selectImageType:any = 0
  public loading:boolean = true;
  items:any=[]
  allorders:any=[]
  displayedit:boolean =false
  displayFileOption:boolean = false 
  displayQRCodeedit:boolean =false
  Nodatafound:boolean = false
  displayfielsOption:boolean = false
  clientid:any
  selectedScreen1:any
  selectedImageType1:any
  displaypriority:boolean = false 
  dropdownList = [];
  allfieldsdata:any=[]
  dropdownSettings = {};
  selectedQrCodeFields:any=[]
  selectedItems = [];
  QrcodeDataGet:any[]
  FiledsList:Array<any>
  constructor(private _chatService: ChatService,
              public router: Router,
              public sockectService: SocketSharedService,
              public toastr: ToastrService,
              public storeData: Store<showChat>) {
                this.clientid =localStorage.getItem("id")
                this.getallfieldsdata()
    //this.onUserData();
   
   
  }


  ngOnInit() {

   // this.getqrcodeScreens()
  }

  getallfieldsdata(){
      this.selectedItems = []
    this._chatService.getAllfields().subscribe(data=>{
      console.log("all fields data")
      console.log(data)
      this.FiledsList = data;
      this.allfieldsdata = data
      this.items = this.allfieldsdata
      //this.dropdownList = this.allfieldsdata
      this.getqrcodeScreens()
      let index = 0
      for(let i=0;i<this.allfieldsdata.length;i++){
       index++
       this.allfieldsdata[i]['id'] = index 
       this.allfieldsdata[i]['itemName'] = this.allfieldsdata[i].lable
     }
      this.dropdownList = this.allfieldsdata
     // this.selectedItems = this.allfieldsdata
      this.dropdownSettings = { 
       singleSelection: false, 
       text:"Select Fields for QR code",
       selectAllText:'Select All',
       unSelectAllText:'UnSelect All',
       enableSearchFilter: true,
       classes:"myclass custom-class"
     }; 
    })
  
 }

  getqrcodeScreens(){
   
    this._chatService.getQrcodeFields().subscribe(data=>{
      this.loading = !(this.loading);
        console.log("get QR data")
        console.log("get all fielads")
        //console.log(this.dropdownList)
        console.log(data)
        this.QrcodeDataGet = data
        let index = 0
        if(data[0].volunteerQRcode.length ==0){
                this.displayQRCodeedit = false
              }else{
                this.displayQRCodeedit = true
              for(let i=0;i<data[0].volunteerQRcode.length;i++){  
                for(let j = 0;j<this.dropdownList.length;j++){
                   if(this.dropdownList[j]._id == data[0].volunteerQRcode[i]._id){
                    console.log(this.dropdownList[j])
                    this.selectedItems.push(this.dropdownList[j])
                   }
                 }
                }
              }
              

              
         this.selectedQrCodeFields = this.selectedItems
         console.log(this.selectedQrCodeFields)

    })
}

ItemDelete(key: any, i: any) {
  this.displaypriority = false
  swal({
    title: 'Are you sure?',
    text: 'You will not be able to recover this data!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    closeOnConfirm: false,
    closeOnCancel: false
  }, (isConfirm) => {
    if (isConfirm) {
      this._chatService.deletePickupItemById(key)
        .subscribe(response => {
          this.displayfield.splice(i, 1);
          swal('Deleted!', 'Deleted Successfully!', 'success');
          this.loading = !(this.loading);
          this.getallfieldsdata()
        })

    } else {
      swal('Cancelled', 'Your data is safe :)', 'error');
    }
  });
}



FieldtypeSelect(event){
  console.log(event)
  this.Fields.type = event
  if(event == "DropDown" || event == "checkbox" || event == "radio"){
    this.displayfielsOption = true
    this.displayFileOption = false
  }else if(event == "file"){
    this.displayFileOption = true
    this.displayfielsOption = false
  }
  else{
   this.displayfielsOption = false
   this.displayFileOption = false
  }

 }
 ImagetypeSelect(event){
  console.log(event)
  this.Fields.filekeys = event
  this.Fields.feildName = event
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

onItemSelect(item:any){
  console.log(item);
  console.log(this.selectedQrCodeFields)
  this.selectedQrCodeFields.push(item)
  console.log(this.selectedQrCodeFields)
 
}

onItemSelectedit(item:any){
  console.log(item);
  console.log(this.selectedQrCodeFields)
  console.log(this.selectedQrCodeFields)
}

OnItemDeSelect(item:any){
  console.log(item);
  // console.log()
  console.log(this.selectedQrCodeFields)
  for(let i=0;i<this.selectedQrCodeFields.length;i++){
    if(item._id == this.selectedQrCodeFields[i]._id){
      this.selectedQrCodeFields.splice(i,1)
    }
  }

  console.log(this.selectedQrCodeFields)
  //console.log(this.selectedItems2);
}
onSelectAll(items: any){
  console.log(items);
}
onDeSelectAll(items: any){
  console.log(items);
}

onInputTime(event){
  console.log(event)
   console.log(this.FiledsList)
  let id = +event
  
  var index = this.FiledsList.findIndex(item1 => item1.priority === id);
  if(index> -1){
    console.log("is  there")
   
    this.displaypriority  = true
}else{
 console.log("not  there")
 this.displaypriority  = false
  }
}

ItemEdit(item:any,index:any){
  this.displaypriority = false
    this.displayedit = true
    this.Fields = item

    this.displayfielsOption = false
    this.displayFileOption = false
    this.selectedImageType1 = this.Fields.feildName
    console.log(this.Fields.type) 
     if(this.Fields.type == "text"){
       this.selectedFieldType1 = "Text" 

     }else if(this.Fields.type == "textarea"){
      this.selectedFieldType1 = "Textarea"
     }else if(this.Fields.type == "number"){
      this.selectedFieldType1 =  "Number"
     }else if(this.Fields.type == "email"){
      this.selectedFieldType1 = "Email"
    }else if(this.Fields.type == "date"){
      this.selectedFieldType1 = "Date"
    }else if(this.Fields.type == "file"){
      this.displayFileOption = true
      this.selectedFieldType1 = "Image"
    }else if(this.Fields.type == "DropDown"){
      this.displayfielsOption = true
      this.selectedFieldType1 = "Drop Down" 
    }else if(this.Fields.type == "checkbox"){
      this.displayfielsOption = true
      this.selectedFieldType1 = "Check Box"
    }else if(this.Fields.type == "radio"){
      this.displayfielsOption = true
      this.selectedFieldType1 = "Radio Button"
    }else {
       
    }
    console.log(this.selectedFieldType1) 
}

UpdateItem(){
  this.displaypriority = false
  console.log(this.Fields)
 this.displayfielsOption = false
 this.displayFileOption = false
 this._chatService.updateRegFieldsById(this.Fields,this.Fields._id).subscribe(data=>{
  this.loading = true
  this.selectedFieldType = 0
  this.Fields = {}
  this.displayedit = false
  this.getallfieldsdata()
 })
  
  }

  onQrFields(){

    var payload ={
      volunteerQRcode:this.selectedQrCodeFields
    }
   this._chatService.addQRCodeFields(payload).subscribe(data=>{
     console.log(data)
     this.displayQRCodeedit = true
     this.toastr.success('QrCode Fields Created Successfully', 'Success!');
    // this.toastr.success("QrCode Fields Created Successfully"); 
   })

 }

 onQrFieldsUpdate(){

  console.log(this.QrcodeDataGet)
  console.log(this.QrcodeDataGet[0]._id)
  //this.QrcodeDataGet[0].QRcode = this.selectedQrCodeFields
  var payload ={
    volunteerQRcode:this.selectedQrCodeFields
   }

  // console.log(payload)
  this._chatService.UpdateQrCodeFields(this.QrcodeDataGet[0]._id,payload).subscribe(data=>{
     console.log(data)
     this.toastr.success('QrCode Fields Updated Successfully', 'Success!'); 
  })

}

onSubmitFields(form: NgForm){
  this.displaypriority = false
  console.log(NgForm)
  //this.loading = !(this.loading);
  if(this.Fields.requiredIn == undefined){
    this.Fields.requiredIn = false
  }
  this.Fields.clientID = this.clientid
  delete this.selectedScreen.forms
 this.Fields.screen = this.selectedScreen
 this.Fields.type = this.selectedFieldType
 console.log(this.Fields)

 this.payload = this.Fields
// console.log(this.displayfield)
 this._chatService.addRegForms(this.payload).subscribe(data=>{
   console.log(data)
   this.payload = []
   this.loading = true
   //this.loading = !(this.loading);
   this.displayfielsOption = false
  this.displayFileOption = false
   this.selectedScreen = 0
   this.selectedFieldType = 0
   this.Fields = {}
  
   this.getallfieldsdata()
 })


}
onChangeTime(event:any){

}

 
}
