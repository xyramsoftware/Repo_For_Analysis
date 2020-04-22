import {Component} from '@angular/core';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import {ToastrService} from 'toastr-ng2';
import {TagsService} from '../tags.service';

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.scss'],
  providers: [TagsService]
})
export class AddTagsComponent {

  public tag: any = {
    tags: ''
  };
  public isLoading: boolean = false;

  constructor(public router: Router,
              public toastr: ToastrService,
              public tasService: TagsService) {
  }

  onSubmitTag(form: NgForm) {
    this.isLoading = !(this.isLoading);
    this.tasService.addTagData(this.tag)
      .subscribe(response => {
        //console.log("Response" + JSON.stringify(response));
        this.toastr.success('Tags Added Successfully!', 'Success!');
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

