import {Component} from '@angular/core';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import {ToastrService} from 'toastr-ng2';
import {MenuItemsService} from './menu-items.service';

const swal = require('sweetalert');

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
  providers: [MenuItemsService]
})
export class MenuItemsComponent {


  siteVal: any;
  clientid:any
  dipslayupdate:boolean = false
  screen:any={}
  menuItems: Array<any>;
  items: Array<any>;
  public loading:boolean = true;
  Nodatafound:boolean=false
  screenId:any
  displaypriority:boolean = false
  constructor(public router: Router,
              public toastr: ToastrService,
              public menuItemsService: MenuItemsService) {
    
    console.log("xbx")
    this.clientid =localStorage.getItem("id")
    console.log(this.clientid)
    this.getAllScreens();
    // this.screen.screenTitle = "test"
    // this.screen.screenNo = 1
  }

  getAllScreens() {
    this.menuItemsService.getAllScreens(this.clientid)
      .subscribe(response => {
        //response.reverse();
        this.menuItems = response;
        console.log(this.menuItems)  
        this.items = response;
        console.log(this.items)

     this.loading = !(this.loading);
      },(error)=>{
       this.loading = !(this.loading);
       this.toastr.error("Somthing is going wrong","Please login again"); 
      })
  }

  initializeItems() {
    this.items = this.menuItems;
  }


  getMenuItems(ev: any) {
    let val = ev;//this is for search operation
    console.log(val)
    this.initializeItems();

    let arrayData: any[] = [];
    if (val == '') {
      arrayData = this.items;
    } else {
      if (val && val.trim() != '') {
        this.Nodatafound = false
        arrayData = this.items.filter((data) => {
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

  menuItemShow(key) {
    this.router.navigate(['/Category/viewCategory', key]);
  }

  ScreenEdit(screenItem) {
    console.log(screenItem)
    this.screenId= screenItem._id
    this.screen.screenTitle = screenItem.screenTitle
   this.screen.screenNo = screenItem.screenNo
    this.dipslayupdate = !(this.dipslayupdate)
   
  
  }

  Updatedata(screen){
   console.log(screen.screenTitle)
   console.log(screen.screenNo)
   this.loading = !(this.loading);
   this.menuItemsService.updateScreenItems(this.screen,this.screenId).subscribe(data=>{
    this.dipslayupdate = !(this.dipslayupdate)
    this.screen={}
    this.getAllScreens();
  })
   
  }

  ScreenItemDelete(key: any, i: any) {
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
        this.menuItemsService.deleteScreenId(key)
          .subscribe(response => {
            this.menuItems.splice(i, 1);
            swal('Deleted!', 'Deleted Successfully!', 'success');
          })


      } else {
        swal('Cancelled', 'Your data is safe :)', 'error');
      }
    });
  }
  


  activemenuitem(item:any){
   
    console.log(item)
   item.state = false   
   this.menuItems = item 
   console.log(this.menuItems)
  
 
   this.menuItemsService.updateMenuItems(this.menuItems, item._id).subscribe(data=>{

    console.log(".............menu active deactive...........")
   console.log(data)

   })

  }

  Savedata(){
    this.loading = !(this.loading);
  console.log(this.screen)
  this.screen.clientID = this.clientid
  this.menuItemsService.addScreens(this.screen).subscribe(data=>{
    //this.loading = !(this.loading);
    this.screen = {}
    this.getAllScreens();
  })
  }


  deactivemenuitem(item:any){

      console.log(item)
    item.state = true
    this.menuItems = item 
    this.menuItemsService.updateMenuItems(this.menuItems, item._id).subscribe(data=>{
      
          console.log(".............menu active deactive...........")
         console.log(data)
      
         })
  }


  onInputTime(event){
     console.log(event)
     this.displaypriority = false
     console.log(this.menuItems)
     console.log(this.menuItems[0].screenNo)
       for(let i=0;i<this.menuItems.length;i++){
         if(event == this.menuItems[i].screenNo){
          var index = this.menuItems.findIndex(items => items.screenNo === event);
          if(index> -1){
             
           console.log("  there")
       }else{
         console.log("not  there")
         this.displaypriority  = true
          }
         }
       }
    
      
  }

  onChangeTime(event){
    console.log(event)
     this.displaypriority = false
     console.log(this.menuItems)
     console.log(this.menuItems[0].screenNo)
       for(let i=0;i<this.menuItems.length;i++){
         if(event == this.menuItems[i].screenNo){
          var index = this.menuItems.findIndex(items => items.screenNo === event);
          if(index> -1){
             
           console.log("  there")
       }else{
         console.log("not  there")
         this.displaypriority  = true
          }
         }
       }
  }
}
