import { Component, OnInit, ViewEncapsulation,Attribute,ViewContainerRef } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { ConstantService } from '../../../constant.service';


export class ReportDefaultContext extends BSModalContext {
  
     
  
  }
@Component({
  selector: 'app-exportmodal',
  templateUrl: './ordermodal.html',
  styleUrls: ['./ordermodal.scss'],
  providers:[]
})
export class ReportmodalComponent implements OnInit {

    context: ReportDefaultContext;
    orderNumber:any
    orderId:any
  image:any
  url:any
  note:boolean
  //="http://54.173.80.197:8000/api/orders/pres/5b4226ee880a55466cddb927?orderID=10102&Presfilenames=prescrption.jpg"
   // http://54.173.80.197:8000/api/orders/pres/5b42f20056188829b0f8ee87?OrderID=10104&Presfilenames=prescrption.jpg
  constructor( private overlay: Overlay, public modal: Modal,  public constantService: ConstantService,private viewContainerRef: ViewContainerRef,
     public dialog: DialogRef<ReportDefaultContext>) { 
        
    this.dialog.context.dialogClass = 'modal-dialog';
    this.dialog.context.isBlocking = false;
    const data = dialog.context;
    this.context = dialog.context;
  this.orderId = data['OrderID']
  this.orderNumber = data['orderNumber']
  this.note = data['note']
    console.log( data['OrderID'])
   

     //this.orderNumber = this.dialog.context.orderNumber;
    // this.orderNumber = this.dialog.context.OrderID
  }

  ngOnInit() {
if(this.note == false ){


     this.image=this.constantService.API_ENDPOINT+'orders/pres/'+this.orderId+'?orderID='+this.orderNumber+'&Presfilenames=prescrption.jpg'
}
else{
  this.image=this.constantService.API_ENDPOINT+'prescription/downloadpres/'+this.orderId+'?prescriptionID='+this.orderNumber+'&filename=prescrption.jpg'
}
  }

  closePartnerDetails(){
    this.dialog.close();
}

DwonloadIMage(){
    
   if(this.note == false){
 this.url=this.constantService.API_ENDPOINT+'orders/pres/'+this.orderId+'?orderID='+this.orderNumber+'&Presfilenames=prescrption.jpg'
   }
   else{
    this.url=this.constantService.API_ENDPOINT+'prescription/downloadpres/'+this.orderId+'?prescriptionID='+this.orderNumber+'&filename=prescrption.jpg'
   }
console.log(this.image)
}


}
