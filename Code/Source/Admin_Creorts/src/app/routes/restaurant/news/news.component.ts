import {Component} from '@angular/core';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import {ToastrService} from 'toastr-ng2';
import {NewsService} from './news.service';
import { ConstantService } from '../../../constant.service';

const swal = require('sweetalert');

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [NewsService]
})
export class NewsComponent {
  siteVal: any;
  carsoels: Array<any>;
  items: any[] = [];
  public loading:boolean = true;
  editpaylod:any={}
  constructor(public router: Router,
              public toastr: ToastrService,
              public constantService: ConstantService,
              public newsService: NewsService) {
    this.getCaroselsData(); // getting all detail news function call
  }

// getting detail news
  getCaroselsData() {
    this.newsService.getCarosels()
      .subscribe(response => {
        this.carsoels = response;
         console.log(this.carsoels)
         let clientId = localStorage.getItem('admin_id')
         for(let i=0;i<this.carsoels.length;i++){
           this.carsoels[i]['url'] = this.constantService.API_ENDPOINT+'carousel/download/id'+this.carsoels[i]._id+'?id='+this.carsoels[i]._id+'&carousel='+this.carsoels[i].carousel
                                              
         }
        this.items = response;
        this.loading = !(this.loading);
      },(error)=>{
       this.loading = !(this.loading);
       this.toastr.error("Something is going wrong","Please login again"); 
      })
  }

  initializeItems() {
    this.items = this.carsoels;
  }

  SaveRow(Obj){
    Obj.userEditing = false
    for(let i=0;i<=this.carsoels.length;i++){
      if(Obj._id == this.carsoels[i]._id){
        this.editpaylod = this.carsoels[i]
        break
      }
    }

    this.editpaylod.title = Obj.title
    this.editpaylod.description = Obj.info
    this.editpaylod.CarouselID = Obj.CarouselID 
    this.newsService.UpdateCaroselData(this.editpaylod._id,this.editpaylod).subscribe(data=>{
     // this.isLoading = !(this.isLoading);
       //this.toastr.success('Curasouls Updated Successfully!', 'Success!');
       this.loading = !(this.loading);
       this.getCaroselsData()
    })

  }

    

  openDialog(Obj){
    Obj.userEditing = true
  }
 
 
   
 
  
  ImageEdit(key,i) {
    this.router.navigate(['/carousels/editCarousels', key]);
  }

  removeChoice(key: any, i: any) {
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
        this.newsService.deleteCurasoulsById(key)
          .subscribe(response => {
            this.carsoels.splice(i, 1);
            swal('Deleted!', 'carousels Deleted Successfully!', 'success');
          })

      } else {
        swal('Cancelled', 'Your data is safe :)', 'error');
      }
    });
  }
}
