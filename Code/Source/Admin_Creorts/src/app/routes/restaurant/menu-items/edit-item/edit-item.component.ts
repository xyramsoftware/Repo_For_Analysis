import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { ToastrService } from 'toastr-ng2';
import { cloudinarUpload } from '../../../../cloudinary.config';
import { MenuItemsService } from '../menu-items.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
  providers: [MenuItemsService]
})
export class EditItemComponent {
  public menuItems: any = {
    title: '',
    description: '',
    discount: 0,
    state: false,
    startDate: '',
    endDate: '',
    menuType: '',
    offer: false,
    extraIngredients: [{}],
    price: [{}],
    category: '',
    categoryTitle: '',
    thumb: '',
    additionalInfo: ''
  };
  public ItemPrice = [];
  public url: any = '';
  public categories: any = [];
  public selectedCategory;
  private menuId: any;
  public isLoading: boolean = false;

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(cloudinarUpload)
  );

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService,
    public menuItemsService: MenuItemsService
  ) {
    this.route.params.map(params => params['id']).subscribe(id => {
      if (id != null) {
        this.menuId = id;
        this.getItemDetails(id);
       // this.getCategoryData();
      }
    });
    this.uploader.onBeforeUploadItem = (item: any) => {
      item.url = this.uploader.options.url;
      localStorage.setItem('image', 'image Is going');
      return item;
    };
  }

  getItemDetails(id) {
    this.menuItemsService.getMenuItemById(id).subscribe(response => {
      this.menuItems = response;
      console.log(this.menuItems);

      //            this.menuItems.startDate = this.menuItems.startDate.Convert.ToDateTime(this.menuItems.startDate )
      console.log(this.menuItems.startDate);
      console.log(this.menuItems.endDate);

      this.menuItems.additionalInfo = response.additionalInfo;
      if (response.additionalInfo == null) {
        this.menuItems.extraIngredients = [{}];
      }
    });
  }

  parseDate(dateString: string): Date {
    alert(dateString);
    if (dateString) {
      return new Date(dateString);
    } else {
      return null;
    }
  }

  // set humanDate(e){
  //   e = e.split('-');
  //   let d = new Date(Date.UTC(e[0], e[1]-1, e[2]));
  //   this.menuItems.startDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1);
  // }

  // get humanDate(){
  //   return this.menuItems.startDate.toISOString().substring(0, 10);
  // }

  // getCategoryData() {
  //   this.menuItemsService.getCategoryData().subscribe(response => {
  //     this.categories = response;
  //   });
  // }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  addNewChoice = function() {
    var newItemNo = this.menuItems.extraIngredients.length + 1;
    this.menuItems.extraIngredients.push({});
  };

  removeChoice = function() {
    if (this.menuItems.extraIngredients.length > 0) {
      var lastItem = this.menuItems.extraIngredients.length - 1;
      this.menuItems.extraIngredients.splice(lastItem);
    }
  };

  addNewPrice = function() {
    var newItemNo = this.menuItems.price.length + 1;
    this.menuItems.price.push({});
  };

  removePrice = function() {
    if (this.menuItems.price.length > 1) {
      var lastItem = this.menuItems.price.length - 1;
      this.menuItems.price.splice(lastItem);
    }
  };

  onChange(event) {
    this.menuItems.additionalInfo = event;
  }

  onSubmitMainItems(form: NgForm) {
    console.log(NgForm);

    this.isLoading = !this.isLoading;
    if (this.menuItems.discount > 0) {
      this.ItemPrice = this.menuItems.price;
      for (let i = 0; i < this.ItemPrice.length; i++) {
        this.ItemPrice[i].specialPrice =
          this.ItemPrice[i].value -
          this.menuItems.discount * this.ItemPrice[i].value / 100;
      }
      this.menuItems.offer = true;
    } else {
      this.ItemPrice = this.menuItems.price;
      this.menuItems.discount = 0;
      for (let i = 0; i < this.ItemPrice.length; i++) {
        this.ItemPrice[i].specialPrice = this.ItemPrice[i].value;
      }
      this.menuItems.offer = false;
    }
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (
      item: any,
      response: string,
      status: number,
      headers: any
    ): any => {
      let res: any = JSON.parse(response);
      this.menuItems.thumb = res.url;

      this.menuItemsService
        .updateMenuItems(this.menuItems, this.menuId)
        .subscribe(
          response => {
            console.log(response);
            localStorage.removeItem('image');
            this.toastr.success(
              'Menu-Items Data Updated Successfully!',
              'Success!'
            );
            this.isLoading = !this.isLoading;
           // this.router.navigate(['/menu/manageItems']);
          },
          error => {
            this.isLoading = !this.isLoading;
            this.toastr.error('Error....');
           // this.router.navigate(['/menu/manageItems']);
          }
        );
    };

    if (localStorage.getItem('image') == null) {
      // console.log(this.menuItems)
      // console.log(this.menuId)

      console.log(this.menuItems.extraIngredients);

      for (let i = 0; i < this.menuItems.extraIngredients.length; i++) {
        if (
          this.menuItems.extraIngredients[i]['name'] != undefined ||
          this.menuItems.extraIngredients[i]['price'] != undefined
        ) {
          if (this.menuItems.extraIngredients[i]['name'].trim() == '') {
            this.menuItems.extraIngredients.splice(i, 1);
          } else {
            this.menuItems.extraIngredients[i]['extracount'] = 0;
          }
        }
      }

      console.log(this.menuItems.extraIngredients);
      this.menuItemsService
        .updateMenuItems(this.menuItems, this.menuId)
        .subscribe(
          response => {
            console.log(response);
            this.toastr.success(
              'Menu-Items Data Updated Successfully!',
              'Success!'
            );
            this.isLoading = !this.isLoading;
            //this.router.navigate(['/menu/manageItems']);
          },
          error => {
            this.isLoading = !this.isLoading;
            this.toastr.error('Error....');
           //this.router.navigate(['/menu/manageItems']);
          }
        );
    }
  }

  cancel() {
    this.router.navigate(['/Category/manageCategory']);
  }

  categorySelect(category) {
    var cat = category.split('+');
    this.menuItems.categoryTitle = cat[0];
    this.menuItems.category = cat[1];
  }

  menutypeSelect(itemtype: any) {
    console.log(itemtype);
    this.menuItems.menuType = itemtype;
  }
  onSubCategory(form: NgForm) {
    this.isLoading = !this.isLoading;
    this.menuItemsService
      .updateMenuItems(this.menuItems, this.menuId)
      .subscribe(
        response => {
          console.log(response)
          this.toastr.success('Category'+'  "'+response.title+'"  '+'Updated Successfully!', 'Success!');
          this.isLoading = !this.isLoading;
         // this.router.navigate(['/Category/manageCategory']);
        },
        error => {
          this.isLoading = !this.isLoading;
          this.toastr.error('Error....');
         // this.router.navigate(['/Category/manageCategory']);
        }
      );
  }
}
