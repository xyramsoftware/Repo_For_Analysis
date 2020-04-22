import { Component } from '@angular/core';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'toastr-ng2';
import { NewsService } from '../news.service';
import { cloudinarUpload } from '../../../../cloudinary.config';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
  providers: [NewsService]
})
export class AddNewsComponent {
  public url: any = 'assets/img/upload.png';
  public carousels: any = {}
  private imageId: string;
  public isLoading: boolean = false;
  filesToUpload: any
  filename: any
  uploadform: any
  imageuplaoderroer: boolean = false
  ImageSize: any
  filesize: any
  Payload: any = {}
  updateImagedata: any
  CaroselsData: any

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(cloudinarUpload)
  );

  constructor(public router: Router,
    public toastr: ToastrService,
    public newsService: NewsService) {
    this.uploader.onAfterAddingFile = (item: any) => {
      item.url = this.uploader.options.url;
      return item;
    };

  }

  //Image Preview

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }


  fileChange(fileInput: any) {

    // let formdata= new FormData();
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.filename = this.filesToUpload[0];
    this.filesize = this.filesToUpload[0].size
    console.log(this.filename)
    console.log(this.uploadform)
  }

  //Submit function
  onSubmitNews(form: NgForm) {
    let clientId = localStorage.getItem('admin_id')
    this.isLoading = !(this.isLoading);
    console.log(form.value)
    this.isLoading = !(this.isLoading);
    console.log(this.filename)
    this.imageuplaoderroer = false
    if (this.filename !== undefined) {
      this.Payload = {
        "carousel": "",
        "clientID": clientId,
        "CarouselID": form.value.order
      }
      console.log(this.Payload)
      this.newsService.addCaroselData(this.Payload).subscribe(data => {
        console.log(data)
        this.CaroselsData = data
        this.uplaodImag(data)
      }, (error) => {
      });
    } else {
      this.imageuplaoderroer = true
    }

   
    // this.uploader.uploadAll();
    // this.isLoading = !(this.isLoading);
    // this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
    //   let res: any = JSON.parse(response);
    //   this.news.thumb = res.url;
    //   console.log("this.news.thumb"+  this.news.thumb );
    //   this.newsService.addNewsData(this.news)
    //     .subscribe(response => {
    //       this.toastr.success('News Data Added Successfully!', 'Success!');
    //       this.isLoading = !(this.isLoading);
    //       this.router.navigate(['/news/manageNews']);
    //     }, (error) => {
    //       this.isLoading = !(this.isLoading);
    //       this.toastr.error("Error....");
    //       this.router.navigate(['/news/manageNews']);
    //     })
    // }
    
  }

  uplaodImag(data: any) {
    let formdata = new FormData();
    formdata.append('carousel', this.filename);
    this.uploadform = formdata
    this.newsService.CurasoulsImage(data._id, this.uploadform).subscribe(data => {
      console.log(data.text())
      this.updateImagedata = data.text()
      this.CaroselsData.carousel = this.updateImagedata
      console.log(this.CaroselsData)
      // this.isLoading = !(this.isLoading);
      this.updateCaroselsdata(this.CaroselsData)
      //this.toastr.success('Curasouls Image Added Successfully!', 'Success!');
      //this.router.navigate(['/carousels/manageCarousels']);
    })
  }

  updateCaroselsdata(CaroselsData: any) {
    this.newsService.UpdateCaroselData(CaroselsData._id, CaroselsData).subscribe(data => {
      this.isLoading = !(this.isLoading);
      this.toastr.success('Carousels image Added Successfully!', 'Success!');
      this.router.navigate(['/carousels/manageCarousels']);
    })
  }

  cancel() {
    this.router.navigate(['/carousels/manageCarousels']);
  }
}

