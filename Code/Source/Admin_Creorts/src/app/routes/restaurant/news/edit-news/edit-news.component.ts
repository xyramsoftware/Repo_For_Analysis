import {Component} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {NgForm} from '@angular/forms';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {ToastrService} from 'toastr-ng2';
import {NewsService} from '../news.service';
import {cloudinarUpload} from '../../../../cloudinary.config';
import {ConstantService} from '../../../../constant.service'
@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss'],
  providers: [NewsService]
})
export class EditNewsComponent {
  public url: any = '';
  public newsDetails: any = {};
  private newsId: any;
  public isLoading: boolean = false;
  filesToUpload:any
  filename:any
  filesize:any
  updateImagedata:any
  uploadform:any
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(cloudinarUpload)
  );

  constructor(private route: ActivatedRoute,
              public router: Router,
              public toastr: ToastrService,
              public constantService: ConstantService,
              public newsService: NewsService) {
    this.route.params.map(params => params['id']).subscribe((id) => {
      if (id != null) {
        this.newsId = id;
        this.getCaroselsDetailById(id);
      }
    });
    this.uploader.onBeforeUploadItem = (item: any) => {
      item.url = this.uploader.options.url;
      localStorage.setItem("image", "image Is going");
      return item;
    };
  }

// getting news detail by its id
  getCaroselsDetailById(id) {
   let clientId = localStorage.getItem('admin_id')
    this.newsService.getCaroselById(id)
      .subscribe(response => {
        this.newsDetails = response
        this.url = this.constantService.API_ENDPOINT+'carousel/download/'+this.newsDetails._id+'?clientID='+clientId+'&id='+this.newsDetails._id+'&carousel='+this.newsDetails.carousel
      })
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
     
      this.filename =   this.filesToUpload[0];
      this.filesize = this.filesToUpload[0].size
        console.log(this.filename)
        // console.log(this.uploadform)
       
        
   
 }

  //Submit function

  // onSubmitNews(form: NgForm) {
  //   this.isLoading = !(this.isLoading);
  //   this.uploader.uploadAll();
  //   this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
  //     let res: any = JSON.parse(response);
  //     this.newsDetails.thumb = res.url;
  //     this.newsService.updateNews(this.newsDetails, this.newsId)
  //       .subscribe(response => {
  //         this.toastr.success('news Data Updated Successfully!', 'Success!');
  //         this.isLoading = !(this.isLoading);
  //         localStorage.removeItem('image');
  //         this.router.navigate(['/news/manageNews']);
  //       }, (error) => {
  //         this.isLoading = !(this.isLoading);
  //         this.toastr.error("Error....");
  //         this.router.navigate(['/news/manageNews']);
  //       })
  //   }
  //   if (localStorage.getItem("image") == null) {
  //     this.newsService.updateNews(this.newsDetails, this.newsId)
  //       .subscribe(response => {
  //         this.toastr.success('news Data Updated Successfully!', 'Success!');
  //         this.isLoading = !(this.isLoading);
         
  //         this.router.navigate(['/news/manageNews']);
  //       }, (error) => {
  //         this.isLoading = !(this.isLoading);
  //         this.toastr.error("Error....");
  //         this.router.navigate(['/news/manageNews']);
  //       })
  //   }  
  // }

  CarouselsUpdate(){
    if(this.filename !== undefined){
     this.caroselUpload()
    }else{
      this.onSubmitNews()
    }
  }

  caroselUpload(){
    let formdata= new FormData();
    formdata.append('carousel', this.filename);
    this.uploadform = formdata
    this.newsService.CurasoulsImage(this.newsDetails._id,this.uploadform).subscribe(data=>{
      console.log(data.text())
      this.updateImagedata = data.text()
      this.newsDetails.carousel = this.updateImagedata
      console.log(this.newsDetails)
      this.onSubmitNews()
      })
  }

  onSubmitNews(){
    this.newsService.UpdateCaroselData( this.newsDetails._id,this.newsDetails).subscribe(data=>{
      this.isLoading = !(this.isLoading);
       this.toastr.success('carousels Data updated Successfully!', 'Success!');
       this.router.navigate(['/carousels/manageCarousels']);
    })
  }

  cancel() {
    this.router.navigate(['/carousels/manageCarousels']);
  }
}
