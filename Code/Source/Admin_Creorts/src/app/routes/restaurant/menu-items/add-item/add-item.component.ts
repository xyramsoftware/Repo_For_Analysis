import { Component, ViewChild,OnInit} from '@angular/core';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { cloudinarUpload } from '../../../../cloudinary.config';
import { MenuItemsService } from '../menu-items.service';

import { DateRangePickerDirective } from '../../../../shared/directives/dateRange.picker.directive';
import * as moment from 'moment';
//import { DatepickerModule as YourAlias } from 'angular2-material-datepicker'

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
  providers: [MenuItemsService]
})
export class AddItemComponent implements OnInit  {

  DiplayScreen:boolean = false

  NoofScreens:number = 1
  saved:boolean = true

  public category: any = {
    title: '',
    number: ''
  };

  ScreenArray:any = [{saved:true}]
  fromdate: any;
  public isLoading: boolean = false;
  
  constructor(
    public toastr: ToastrService,
    public router: Router,
    public menuItemsService: MenuItemsService
  ) {
    
    };

  cancel() {
    this.router.navigate(['/Category/manageCategory']);
  }

//////////////////////////////
ngOnInit(){
     
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
onKeyPressNumber(event){
  this.ScreenArray = []
  this.DiplayScreen = true
  console.log(this.ScreenArray.length)
  for(var i=0;i<event.Key;i++){
    this.ScreenArray.push({})
  }
 console.log(this.ScreenArray)
}

onChange(event){
  this.ScreenArray = []
  this.DiplayScreen =true
  console.log(this.ScreenArray.length)
 console.log(event.target.value)
  for(var i=0;i<event.target.value;i++){
    
    this.ScreenArray.push({})
    console.log(this.ScreenArray)
  }
 console.log(this.ScreenArray)

}

addNewChoice(){
  this.NoofScreens ++
  this.ScreenArray.length + 1
  this.ScreenArray.push({saved:true})
}


removeChoice(){
  if(this.NoofScreens == 1){

  }else{
    this.NoofScreens --
    var lastItem = this.ScreenArray.length - 1
    this.ScreenArray.splice(lastItem)
  }
 
}


Save(event){
  console.log(event)
  event.saved = false
  // this.menuItemsService.addScreens(event).subscribe(data=>{
  //   console.log(data)
  // })
}

}
 


