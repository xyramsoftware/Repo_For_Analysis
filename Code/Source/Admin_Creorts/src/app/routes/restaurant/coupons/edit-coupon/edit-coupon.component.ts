import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { ToastrService } from 'toastr-ng2';
import { cloudinarUpload } from '../../../../cloudinary.config';
import { CouponsService } from '../coupons.service';
import {ConstantService} from '../../../../constant.service'

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.scss'],
  providers: [CouponsService]
})
export class EditCouponComponent {
  
  public expenseDetails: any = {};
  private couponId: any;
  public isLoading: boolean = false;
  public loading: boolean = false;
   comptoSelected: any = []
   ExpenseData: any = {
    ExpenseItem: '',
    Date: '',
    InvoiceNo: '',
    RecorderBy: '',
    Amount: '',
    expenseImg:''
  }
  showModal: boolean;
  previewUrl: any = null;
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }

  public url: any = '';
  public newsDetails: any = {};
  private newsId: any;
  filesToUpload:any
  filename:any
  filesize:any
  updateImagedata:any
  uploadform:any
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(cloudinarUpload)
  );
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService,
    public couponService: CouponsService,
    public constantService: ConstantService,
  ) {
    this.route.params.map(params => params['id']).subscribe(Id => {
      if (Id != null) {
        this.couponId = Id;
        this.getexpenseDetailById(Id); //function call to get Detail by id
      }
    });
    this.uploader.onBeforeUploadItem = (item: any) => {
      item.url = this.uploader.options.url;
      localStorage.setItem("file", "image Is going");
      return item;
    };
  }

  getexpenseDetailById(Id) {
    let clientId = localStorage.getItem('admin_id')
    this.couponService.getExpenseById(Id).subscribe(response => {
      this.expenseDetails = response;
      this.ExpenseData.Date = response.Date
      //this.couponDetails.Date = response.Date;
      console.log(this.expenseDetails);
      this.comptoSelected = this.expenseDetails.test
      console.log(this.comptoSelected)
      console.log(response);

      this.url = this.constantService.API_ENDPOINT+'expense/download?id='+this.expenseDetails._id+'&expenseImg='+this.expenseDetails.expenseImg
      // this.getalltestdata()
    });


  }
  ExpenseUpdate(){
    if(this.filename !== undefined){
     this.expenseUpload()
    }else{
      this.onSubExpense()
    }
  }

  expenseUpload(){
    let formdata= new FormData();
    formdata.append('expenseImg', this.filename);
    this.uploadform = formdata
    this.couponService.ExpenseImage(this.expenseDetails._id,this.uploadform).subscribe(data=>{
      console.log(data.text())
      this.updateImagedata = data.text()
      this.expenseDetails.expenseImg = this.updateImagedata
      console.log(this.expenseDetails)
      this.onSubExpense()
      })
  }

 
  onSubExpense() {
    this.isLoading = !this.isLoading;
    console.log(this.comptoSelected)

    this.expenseDetails.test = this.comptoSelected
    console.log(this.expenseDetails)
    console.log(this.ExpenseData)
    this.couponService.updateexpenseById(this.expenseDetails, this.couponId)
      .subscribe(
        response => {
          console.log(response)
          this.toastr.success('Expense Updated Successfully!', 'Success!');
          this.isLoading = !this.isLoading;
          this.router.navigate(['/coupons/all']);
        },
        error => {
          this.isLoading = !this.isLoading;
          this.toastr.error('Error....');
          // this.router.navigate(['/coupons/all']);
        }
      );
  }
  cancel() {
    this.router.navigate(['/coupons/all']);
  }


  dateChanged(newDate) {
    this.expenseDetails.Date = new Date(newDate);
    console.log(this.expenseDetails.Date); // <-- for testing
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

  
}
