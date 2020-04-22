import {Component} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ToastrService} from 'toastr-ng2';

const swal = require('sweetalert');
import {TagsService} from './tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  providers: [TagsService]
})
export class TagsComponent {

  tags: Array<any>;
  public loading:boolean = true;

  constructor(public router: Router,
              public toastr: ToastrService,
              public tasService: TagsService) {
    this.tasService.getTagsData()
      .subscribe(response => {
        this.tags = response;
        this.loading = !(this.loading);
      },(error)=>{
       this.loading = !(this.loading);
       this.toastr.error("Somthing is going wrong","Please login again"); 
      })
  }


  tagEdit(key) {
    this.router.navigate(['/tags/editTags', key]);
  }

  tagDelete(key: any, i: any) {
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
        this.tasService.deleteTagData(key)
          .subscribe(response => {
            this.tags.splice(i, 1);
            swal('Deleted!', 'Tag Deleted Successfully!', 'success');
          })

      } else {
        swal('Cancelled', 'Your data is safe :)', 'error');
      }
    });
  }

}
