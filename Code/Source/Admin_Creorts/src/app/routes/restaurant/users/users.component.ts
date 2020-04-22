import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from './users.service';
import {ToastrService} from 'toastr-ng2';

const swal = require('sweetalert');

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService]
})
export class UsersComponent {
  public users: Array<any>;
  public loading:boolean = true;
  id:any
   userdata:any
   alluserlist:any=[]
   items:any=[]
   userlist:any=[]
   Nodatafound:boolean=false
   searchTerm:any;
  constructor(public router: Router, public toastr: ToastrService,public usersService: UsersService) {
    localStorage.removeItem('user_team');
    localStorage.removeItem('url');
    this.getAllUserDetail();
   localStorage.removeItem('UserId');
   
  }


  search(): void {
    let term = this.searchTerm;
    this.users = this.users.filter(function(tag) {
        return tag.name.indexOf(term) >= 0;
    }); 
}
//Getting all user detail
  getAllUserDetail() {
    this.usersService.getUsersData()
      .subscribe(response => {
       
        this.users = response;
        this.alluserlist = this.users
        console.log(this.alluserlist)
    //   for(let i=0;i<this.users.length;i++){
    //  if(this.users[i].role == 'guest' || this.users[i].role=="guest"){
    //   console.log(this.users[i]._id)
    //  this.users.splice(i,1)

    //  }
          
    //   }

       
        this.loading = !(this.loading);
      },(error)=>{
       this.loading = !(this.loading);
       this.toastr.error("Something is going wrong","Please login again"); 
      })
  }


  initializeItems() {
    this.items = this.alluserlist;
    //console.log(this.items)
  }


  getusename(ev: any) {
   
   // let val = name;//this is for search operation
   let val = ev.target.value;
    console.log(val)
    this.initializeItems();

    let arrayData: any[] = [];
    if (val == '') {
      //alert("empty")
      arrayData = this.items;
      this.users = this.alluserlist
     // this.userlist = this.olduserliat
      // console.log(this.userslist) 
     

    } else {
      if (val && val.trim() != '') {
        this.Nodatafound = false
        this.users = this.items.filter((data) => {
          var searchText=data['name']+data['RegisterId']+data['phone'].toString()
          console.log(this.users)
          return (searchText.toLowerCase().indexOf(val.toLowerCase()) > -1
          );
        })
        
       
         console.log(this.users)
      }
    }

    if (this.users.length > 0) {
      this.items = this.users;
    } else {
      this.Nodatafound = true
     // this.toastr.warning('Your Search Data Is Not Found!', 'Warning!');
    }


  }

  usersShow(key) {
    this.router.navigate(['/users/viewUser', key]);
  }

  usersDelete(key: any, i: any) {
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
        this.usersService.deleteUserById(key)
          .subscribe(response => {
            this.users.splice(i, 1);
            swal('Deleted!', 'User Deleted Successfully!', 'success');
          })

      } else {
        swal('Cancelled', 'Your data is safe :)', 'error');
      }
    });
  }


  deactiveuser (item:any){




 console.log(item)
 item.status = true 
  this.id=item._id

 console.log(item.email)

 this.usersService.UpdateUserData(item,this.id).subscribe(response =>{
console.log(response)

 })
  }

  activeuser(item:any){
    item.status = false  
    console.log(item)
    this.id=item._id
    item.email = item.email
    console.log(item.email)
    this.usersService.UpdateUserData(item,this.id).subscribe(response =>{
      console.log(response)
      
       })
  }
}
