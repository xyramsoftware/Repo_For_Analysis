import {Component} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {NgForm} from '@angular/forms';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {ToastrService} from 'toastr-ng2';
import {TagsService} from '../tags.service';

@Component({
  selector: 'app-edit-tages',
  templateUrl: './edit-tages.component.html',
  styleUrls: ['./edit-tages.component.scss'],
  providers: [TagsService]
})
export class EditTagesComponent {

  public tagDetails: any = {};
  private tagId: any;
  public isLoading: boolean = false;

  constructor(private route: ActivatedRoute,
              public router: Router,
              public toastr: ToastrService,
              public tasService: TagsService) {

    this.route.params.map(params => params['id']).subscribe((Id) => {
      if (Id != null) {
        this.tagId = Id;
        this.getTagDetailById(Id); //function call to get tagDetail by id
      }
    });
  }

  //tag detail by id
  getTagDetailById(id) {
    this.tasService.getTagById(id)
      .subscribe(response => {
        this.tagDetails = response;
      })
  }

  //Update
  onSubmitTag(form: NgForm) {
    this.isLoading = !(this.isLoading);
    this.tasService.updateTagById(this.tagDetails, this.tagId)
      .subscribe(response => {
        this.toastr.success('Tags Updated Successfully!', 'Success!');
        this.isLoading = !(this.isLoading);
        this.router.navigate(['/tags/all']);
      }, (error) => {
        this.isLoading = !(this.isLoading);
        this.toastr.error("Error....");
        this.router.navigate(['/tags/all']);
      })


  }

  cancel() {
    this.router.navigate(['/tags/all']);
  }
}
