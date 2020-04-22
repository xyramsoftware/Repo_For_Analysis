import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'toastr-ng2';
import { ContactUsService } from './contact-us.service';
import { Router, ActivatedRoute } from '@angular/router';
const swal = require('sweetalert');

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  providers: [ContactUsService]
})
export class ContactUsComponent implements OnInit {

  public contacts: Array<any>;
  public loading: boolean = true;
  public latestnews: any = {}
  items: any = []
  NewsId: any;
  News: any = []
  newsGrid: boolean = true;
  newsSave: boolean = true
  newsUpdate: boolean = false;
  public isLoading: boolean = false;
  allnewslist: any = []

  newslist: any = []
  Nodatafound: boolean = false
  NewsData: any = {
    title: '',
    description: ''
  }
  searchTerm: any;
  constructor(private route: ActivatedRoute,
    public toastr: ToastrService,
    private contactService: ContactUsService,
    public router: Router) {
    this.route.params.map(params => params['id']).subscribe(Id => {
      if (Id != null) {
        this.NewsId = Id;
        this.newsGrid = false;
        this.newsSave = false
        this.newsUpdate = true;
        this.getNewsById(Id); //function call to get userDetails by id

        console.log(Id);
        localStorage.setItem('UserId', JSON.stringify(Id))
      }
    });
    this.getLatestNews();
  }

  getNewsById(Id) {
    this.contactService.getNewsById(Id).subscribe(response => {
      this.News = response;

      console.log(response);
    })
  }

  initializeItems() {
    this.items = this.allnewslist;

    //console.log(this.items)
  }


  search(): void {
    let term = this.searchTerm;
    this.newslist = this.newslist.filter(function (tag) {
      return tag.name.indexOf(term) >= 0;
    });
  }
  getnewstitle(ev: any) {

    // let val = name;//this is for search operation
    let val = ev.target.value;
    console.log(val)
    this.initializeItems();

    let arrayData: any[] = [];
    if (val == '') {
      //alert("empty")
      arrayData = this.items;
      this.contacts = this.allnewslist
      // this.userlist = this.olduserliat
      // console.log(this.userslist) 


    } else {
      if (val && val.trim() != '') {
        this.Nodatafound = false
        this.contacts = this.items.filter((data) => {
          var searchText = data['title']
          console.log(this.contacts)
          return (searchText.toLowerCase().indexOf(val.toLowerCase()) > -1
          );
        })


        console.log(this.contacts)
      }
    }

    if (this.contacts.length > 0) {
      this.items = this.contacts;
    } else {
      this.Nodatafound = true
      // this.toastr.warning('Your Search Data Is Not Found!', 'Warning!');
    }


  }
  getLatestNews() {
    this.contactService.getNews().subscribe((res) => {
      this.contacts = res;

      this.newslist = res
      this.allnewslist = this.newslist
      console.log(this.contacts)
      //	console.log(" getcontacts Data "+JSON.stringify(res));
      this.loading = !(this.loading);
    }, (error) => {
      this.loading = !(this.loading);
      this.toastr.error("Something is going wrong", "Please login again");
    })

  }

  updateNews(key) {
    this.isLoading = !this.isLoading;

    console.log(this.News)

    this.contactService.updateNewsById(this.News, key)
      .subscribe(
        response => {
          console.log(response)
          this.toastr.success('News' + '  "' + response.title + '"  ' + '  Updated Successfully!', 'Success!');
          this.isLoading = !this.isLoading;
          this.router.navigate(['/contacts/all']);
        },
        error => {
          this.isLoading = !this.isLoading;
          this.toastr.error('Error....');
          // this.router.navigate(['/coupons/all']);
        }
      );
  }

  editNews(key) {
    this.router.navigate(['/contacts/all', key]);

  }

  ngOnInit() {
  }


  SaveNews() {

    this.contactService.addNews(this.latestnews).subscribe(data => {
      this.latestnews = {}
      this.toastr.success("News is created successfully", "successfully !");
      this.getLatestNews()
      this.loading = !(this.loading);
    })

  }
  cancel() {
    
    this.router.navigate(['contacts/all']);
  }

  NewsDelete(key: any, i: any) {
    console.log(key)
    console.log(i)
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
        this.contactService.deleteLatestNewa(key)
        .subscribe(response => {
          this.contacts.splice(i, 1);
          swal('Deleted!', 'Latest News Deleted Successfully!', 'success');
      
          })
      } else {
        swal('Cancelled', 'Your data is safe :)', 'error');
      }
    });
  }


}
