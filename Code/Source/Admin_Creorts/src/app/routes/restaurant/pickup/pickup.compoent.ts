import {Component} from '@angular/core';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import {ToastrService} from 'toastr-ng2';
import {PickupItemsService} from './pickup.service';

const swal = require('sweetalert');


@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.scss'],
  providers: [PickupItemsService]
})
export class FoodPickupComponent {


 
  clientid:any
  items:any
  carsoels:any=[]
  
  public loading:boolean = true;
  constructor(public router: Router,
              public toastr: ToastrService,
              public PickupItemsService: PickupItemsService) {
                this.clientid =localStorage.getItem('admin_id')
               
    this.getAllGalleryList();
    //this.loading = !(this.loading);
      
  }


  getAllGalleryList(){
    this.PickupItemsService.getGalleryData().subscribe(data=>{
       console.log(data)
       this.items = data
       this.carsoels = data
       this.loading = !(this.loading);
    })
  }



  removegallery(key: any, i: any) {
    console.log(key)
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
        this.PickupItemsService.deleteGallery(key)
          .subscribe(response => {
            this.carsoels.splice(i, 1);
            swal('Deleted!', 'Gallery Image Deleted Successfully!', 'success');
          })

      } else {
        swal('Cancelled', 'Your data is safe :)', 'error');
      }
    });
  }

}
