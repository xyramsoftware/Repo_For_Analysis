import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ToastrService} from 'toastr-ng2';
import {NgForm} from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import {CategoriesService} from './categories.service';


const swal = require('sweetalert');

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesService]
})
export class CategoriesComponent implements OnInit {

  siteVal: any;
  public categories: Array<any>;
  public events: Array<any>;
  //public Category:Array<any>
  public items: any[] = [];
  public loading:boolean = true;
  activePage:any=2
  searchitems:any=[]
  Nodatafound:boolean= false
  event:any={}
  Category:any={}
  eventdates:any=[]
  CategoryList:any[]
  Dates:any=[]
  isLoading:any
  constructor(public router: Router,
              public toastr: ToastrService,
              private meta: Meta,
              public categoriesService: CategoriesService) {
                console.log("event")
                this.loading = !(this.loading);
                this.getEventDates()
                this.getCarogory()
    this.categoriesService.getEventData()
      .subscribe(response => {
         //response.reverse();
        console.log(response)
        this.events = response;
        for(let i=0;i<this.events.length;i++){
          this.events[i]["SLNumber"] = i+1
        }

        for(let i=0;i<this.events.length;i++){
          console.log(this.events[i].startTime)
          if(this.events[i].startTime != undefined){
              let hour = (this.events[i].startTime.split(':'))[0]
                 let min = (this.events[i].startTime.split(':'))[1]
                 let hour1 = +(this.events[i].startTime.split(':'))[0]
                 let part = +hour > 12 ? 'PM' : 'AM';
                 min = (min+'').length == 1 ? `0${min}` : min;
                 hour1 = +hour > 12 ? +hour - 12 : +hour;
                 console.log("hours",hour1)
                 let time2 = `${hour1}:${min} ${part}`
                 console.log("///")
                 console.log(time2)
                 this.events[i].startTime = time2  
          }
          if(this.events[i].endTime != undefined){
              let hour = (this.events[i].endTime.split(':'))[0]
                 let min = (this.events[i].endTime.split(':'))[1]
                 let hour1 = +(this.events[i].endTime.split(':'))[0]
                 let part = +hour > 12 ? 'PM' : 'AM ';
                 min = (min+'').length == 1 ? `0${min}` : min;
                 hour1 = +hour > 12 ? +hour - 12 : +hour;
                 console.log("hours",hour1)
                 let time2 = `${hour1}:${min} ${part}`
                 console.log("///")
                 console.log(time2)
                 this.events[i].endTime = time2  
          }
        }
        
        this.categories = this.events
        this.items = this.events;
        console.log(this.items)
       // this.loading = !(this.loading);
      },(error)=>{
       this.loading = !(this.loading);
       this.toastr.error("Somthing is going wrong","Please login again"); 
      })
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

  getCarogory(){
    this.categoriesService.getCatogory().subscribe(data=>{
      this.CategoryList = data
      console.log(this.CategoryList)
    })
  }
  ngOnInit() {
    this.meta.addTag({ name: 'description', content: 'How to use Angular 4 meta service' });
    this.meta.addTag({ name: 'author', content: 'talkingdotnet' });
    this.meta.addTag({ name: 'keywords', content: 'Angular, Meta Service' });
  }

  initializeItems() {
    this.searchitems = this.categories;
    console.log(this.searchitems)
  }




  getCategory(ev: any) {
    let val = ev;//this is for search operation
    console.log(val)
    this.initializeItems();

    let arrayData: any[] = [];
    if (val == '') {
      arrayData = this.searchitems;
    } else {
      if (val && val.trim() != '') {
        this.Nodatafound = false
        arrayData = this.searchitems.filter((data) => {
          return (data.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }

    if (arrayData.length > 0) {
      this.items = arrayData;
    } else {
      this.items = arrayData;
      this.Nodatafound = true
     // this.toastr.warning('Your Search Data Is Not Found!', 'Warning!');
    }


  }

  categoryShow(key) {
    this.router.navigate(['/categories/viewCategory', key]);
  }

  categoryEdit(key) {
    this.router.navigate(['/Events/editTest', key]);
  }

  EventDelete(key: any, i: any) {
    console.log(key)
    console.log(i)
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
        this.categoriesService.deleteCategoryData(key)
          .subscribe(response => {
           
            for(let i=0;i<this.items.length;i++){
              if(this.items[i]._id == key){
                this.items.splice(i,1)
              }
            }
           // this.items.splice(i, 1);
           
            swal('Deleted!', 'Event Deleted Successfully!', 'success');
          })
      } else {
        swal('Cancelled', 'Your data is safe :)', 'error');
      }
    });
  }

  onPageChange(event) {
    console.log("ON page change");
    this.activePage = event.activePage;
  }

  SaveEvntDate(){
     console.log(this.event)
     console.log(this.event.valid)
    this.categoriesService.addEventDates(this.event).subscribe(data=>{
      this.toastr.success("Event Date is Created","Cerated !");
      this.getEventDates()
      this.event.EventDate=""
    })
  }

  SaveCategory(){
     this.categoriesService.addCatogory(this.Category).subscribe(data=>{
      this.toastr.success("Category is Created","Cerated !");
      this.getCarogory()
      this.Category.categoryName = ""
     })
  }
 

  deletedate(data:any){
     
    console.log(data)
    this.categoriesService.deleteEventDate(data._id).subscribe(data=>{
      this.toastr.success("Event Date is Deleted","Deleted !");
      this.getEventDates()
    })     
  }
}


