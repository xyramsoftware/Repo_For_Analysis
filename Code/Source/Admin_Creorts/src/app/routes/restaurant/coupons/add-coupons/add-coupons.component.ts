import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { ToastrService } from 'toastr-ng2';
import { cloudinarUpload } from '../../../../cloudinary.config';
import { CouponsService } from '../coupons.service';
import {ConstantService} from '../../../../constant.service';
import { Http, ResponseContentType } from '@angular/http';


@Component({
  selector: 'app-add-coupons',
  templateUrl: './add-coupons.component.html',
  styleUrls: ['./add-coupons.component.scss'],
  providers: [CouponsService]
})
export class AddCouponsComponent {
  public url: any = '';
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  public expense: any = {
    ExpenseItem: '',
    date: 0,
    InvoiceNo: '',
    RecorderBy: '',
    Amount: '0',
    expenseImg: ''
  };
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

  comptoSelected: any = []

  public loading: boolean = false;

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
  ExpenseData: any

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
    public router: Router,
    public toastr: ToastrService,
    public couponsService: CouponsService,
    public constantservice:ConstantService,
    private Http:Http
    //public datepipe: DatePipe
  ) {

    //this.getalltestdata()
    // this.getcategorydata()
  }

  onSubExpense1(form: NgForm) {
    console.log(form);
    this.expense.ExpenseItem = form.value.expenseitem
    this.expense.date = form.value.date
    // this.expense.Date =this.datepipe.transform(form.value.date, 'yyyy-mm-dd')
    this.expense.InvoiceNo = form.value.invoiceno
    this.expense.RecorderBy = form.value.recorderby
    this.expense.Amount = form.value.amount
    this.isLoading = !this.isLoading;
    this.couponsService.addExpenseData(this.expense).subscribe(
      response => {
        console.log("response")
        console.log(response)
        this.expense = response
        this.toastr.success('Expense' + '  "' + response.ExpenseItem + '"  ' + '   Added Successfully!', 'Success!');
        this.isLoading = !this.isLoading;
        this.router.navigate(['/coupons/all']);
      },
      error => {
        this.isLoading = !this.isLoading;
        this.toastr.error('Error....');
        this.router.navigate(['/coupons/all']);
      }
    );
  }


  onSubExpense(form: NgForm) {
    let clientId = localStorage.getItem("id")
    this.isLoading = !(this.isLoading);
    console.log(form.value)
    this.isLoading = !(this.isLoading);
    console.log(this.filename)
    this.imageuplaoderroer = false
    this.expense.ExpenseItem = form.value.expenseitem
    this.expense.date = form.value.date
    this.expense.InvoiceNo = form.value.invoiceno
    this.expense.RecorderBy = form.value.recorderby
    this.expense.Amount = form.value.amount
    this.expense.expenseImg = ''
    this.isLoading = !this.isLoading;
    if (this.filename !== undefined) {
      this.Payload = this.expense

      console.log(this.Payload)
      this.couponsService.addExpenseData(this.Payload).subscribe(data => {
        console.log(data)
        this.ExpenseData = data
        this.uplaodImag(data)
      }, (error) => {
      });
    } else {
      this.isLoading = !this.isLoading;
      this.couponsService.addExpenseData(this.expense).subscribe(
        response => {
          console.log("response")
          console.log(response)
          this.expense = response
          this.toastr.success('Expense  Added Successfully!', 'Success!');
          this.isLoading = !this.isLoading;
          this.router.navigate(['/coupons/all']);
        },
        error => {
          this.isLoading = !this.isLoading;
          this.toastr.error('Error....');
          this.router.navigate(['/coupons/all']);
        }
      );
    }
  }


  cancel() {
    this.router.navigate(['/coupons/all']);
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
  
  
  expenseDetails(expenseDetails: any) {
    throw new Error("Method not implemented.");
  }

  fileChange(fileInput: any) {

    // let formdata= new FormData();
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.filename = this.filesToUpload[0];
    // this.preview();
    // const extension = this.filename.split('.').pop().toLowerCase();
    this.filesize = this.filesToUpload[0].size
    console.log(this.filename)
    console.log(this.uploadform)
  }
//   preview() {
//     // Show preview 
//     var mimeType = this.filesToUpload.type;
//     if (mimeType.match(/image\/*/) == null) {
//       return;
//     }
 
//     var reader = new FileReader();      
//     reader.readAsDataURL(this.filesToUpload); 
//     reader.onload = (_event) => { 
//       this.previewUrl = reader.result; 
//     }
// }
 

  // download() {
  //   return this.Http
  //     .get(this.url, {
  //       responseType: ResponseContentType.Blob,
  //     })
  //     .map(res => {
  //       return {
  //         filename:this.filename,
  //         data: res.blob()
  //       };
  //     })
  //     .subscribe(res => {
  //       let url = window.URL.createObjectURL(res.data);
  //       let a = document.createElement('a');
  //       document.body.appendChild(a);
  //       a.setAttribute('style', 'display: none');
  //       a.href = url;
  //       a.download = res.filename;
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //       a.remove();
  //     });
  // }
  uplaodImag(data: any) {
    console.log(data);
    let formdata = new FormData();
    formdata.append('expenseImg', this.filename);
    console.log('expenseImg', this.filename)
    console.log(formdata)
    this.uploadform = formdata
    this.couponsService.ExpenseImage(data._id, this.uploadform).subscribe(data => {
      console.log(data.text())
      this.updateImagedata = data.text()
      this.ExpenseData.expenseImg = this.updateImagedata
      console.log(this.ExpenseData)
      this.updateExpensedata(this.ExpenseData)

    },
    error => {
      this.isLoading = !this.isLoading;
      this.toastr.error('Error....');
      this.router.navigate(['/coupons/all']);
    }
    )
  }

  updateExpensedata(ExpenseData: any) {
    this.couponsService.UpdateExpenseData(ExpenseData._id, ExpenseData).subscribe(data => {
      this.isLoading = !(this.isLoading);
      this.toastr.success('Expense image added successfully!', 'Success!');
      this.router.navigate(['/coupons/all']);
    })
  }
}
