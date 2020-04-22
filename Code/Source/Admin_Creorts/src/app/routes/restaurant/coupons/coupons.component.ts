import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { CouponsService } from './coupons.service';
import { NgForm } from '@angular/forms';
import { ConstantService } from '../../../constant.service'

const swal = require('sweetalert');

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss'],
  providers: [CouponsService]
})
export class CouponsComponent {
  public coupons: Array<any>;
  showModal: boolean;
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  
  public loading: boolean = true;
  //public items: any[] = [];
  expense: any = [];
  Fields: any = {}
    clientid: any
  items: Array<any>;
  private totalAmount = 0;

  FiledsList: any = []

  constructor(
    public router: Router,
    public toastr: ToastrService,
    public couponsService: CouponsService,
    public constantService: ConstantService,
  ) {
    this.getExpenseDetail();
  }
  expenseEdit(key) {
    console.log(key);
    this.router.navigate(['/coupons/editCoupon', key]);
  }
  viewexpense(key) {
    this.router.navigate(['/coupons/viewCoupon', key]);
  }

  getExpenseDetail() {
    this.couponsService.getFormFiledsData().subscribe(
      response => {
        // response.reverse();
        this.FiledsList = response

        for (let j = 0; j < this.FiledsList.length; j++) {
          this.totalAmount += this.FiledsList[j].Amount
          if (this.FiledsList[j].expenseImg == " ") {
            this.FiledsList[j]['url'] = "NA";
          }
          else {
            this.FiledsList[j]['url'] = this.constantService.API_ENDPOINT + 'expense/download?id=' + this.FiledsList[j]._id + '&expenseImg=' + this.FiledsList[j].expenseImg
          }
        }
        this.items = response
        console.log(this.items)
        console.log(this.totalAmount);
        this.coupons = response;
        console.log(this.coupons)
        this.loading = !this.loading;
      },
      error => {
        this.loading = !this.loading;
        this.toastr.error('Something is going wrong', 'Please login again');
      }
    );
  }




  ExpenseDelete(key: any, i: any) {
    console.log(key, i)
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
        this.couponsService.deleteExpenseById(key)
          .subscribe(response => {
            this.items.splice(i, 1);
           this.loading = !(this.loading);
            this.totalAmount = 0;
            this.getExpenseDetail();
            swal('Deleted!', 'Expense Deleted Successfully!', 'success');
          })
      } else {
        swal('Cancelled', 'Your data is safe :)', 'error');

      }
    })

  }

  generateReport(){
    this.couponsService.expensereport().subscribe(response => {
      //let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      //const url= window.URL.createObjectURL(blob);
      //window.open(url);
      window.location.href = response.url;
      this.toastr.success('Your file was downloaded succesfully')
      //fileSaver.saveAs(blob, 'employees.json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
      
  }

  onChangeTime(event) {

  }
}
