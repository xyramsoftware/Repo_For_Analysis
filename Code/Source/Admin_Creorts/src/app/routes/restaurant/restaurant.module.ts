import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomFormsModule} from 'ng2-validation';
import {SharedModule} from '../../shared/shared.module';
import {LaddaModule} from 'angular2-ladda';
import {MomentModule} from 'angular2-moment';
import { CKEditorModule } from 'ng2-ckeditor';


import {CategoriesComponent} from './categories/categories.component';
import {AddCategoriesComponent} from './categories/add-categories/add-categories.component';
import {MenuItemsComponent} from './menu-items/menu-items.component';
import {AddItemComponent} from './menu-items/add-item/add-item.component';
import {OrdersComponent} from './orders/orders.component';
import {ViewOrderComponent} from './orders/view-order/view-order.component';
import {UsersComponent} from './users/users.component';
import {AddUserComponent} from './users/add-user/add-user.component';
import {ViewUserComponent} from './users/view-user/view-users.component';
import {SettingsComponent} from './settings/settings.component';
import {TagsComponent} from './tags/tags.component';
import {EditTagesComponent} from './tags/edit-tages/edit-tages.component';
import {AddTagsComponent} from './tags/add-tags/add-tags.component';
import {BusinessInfoComponent} from './business-info/business-info.component';
import {ProfileComponent} from './profile/profile.component';
import {EditCategoryComponent} from './categories/edit-category/edit-category.component';
import {ViewCategoryComponent} from './categories/view-category/view-category.component';
import { EditCouponComponent } from './coupons/edit-coupon/edit-coupon.component';
import { ViewCouponComponent } from './coupons/view-coupon/view-coupon.component';
import {ViewItemComponent} from './menu-items/view-item/view-item.component';
import {EditItemComponent} from './menu-items/edit-item/edit-item.component';
import {NewsComponent} from './news/news.component';
import {AddNewsComponent} from './news/add-news/add-news.component';
import {EditNewsComponent} from './news/edit-news/edit-news.component';
import {ViewNewsComponent} from './news/view-news/view-news.component';
import {CouponsComponent} from './coupons/coupons.component';
import {AddCouponsComponent} from './coupons/add-coupons/add-coupons.component';
import {PushNotificationComponent} from './push-notification/push-notification.component';
import { TableBookingComponent } from './table-booking/table-booking.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ClockPickerComponent } from './time-picker/timepicker.component';
//import {FoodPickupComponent} from '../../routes/restaurant/pickup/pickup.compoent'

import {Ng2CloudinaryModule} from 'ng2-cloudinary';
import {FileUploadModule} from 'ng2-file-upload';
import {AuthService} from '../pages/login/auth.service';
import {LoginService} from '../pages/login/login.service';

import {Ng2PaginationModule} from 'ng2-pagination';
import {DataTableModule} from "angular2-datatable";
import {ChatComponent} from './chat/chat.component';
import {ChatBoxComponent} from './chat/chat-box/chat-box.component';

import {StoreModule} from '@ngrx/store';
import {chatData} from "./chat/action";

import { AngularMultiSelectModule } from 'angular2-multiselect-checkbox-dropdown/angular2-multiselect-dropdown'
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';


@NgModule({
  imports: [
    Ng2ChartsModule,
    SharedModule,
    CustomFormsModule,
    Ng2PaginationModule,
    DataTableModule,
    Ng2CloudinaryModule,
    MomentModule,
    FileUploadModule,
    CKEditorModule,
    AngularMultiSelectModule,
    LaddaModule.forRoot({}),
    StoreModule.provideStore({data: chatData})
  ],

  declarations: [
    CategoriesComponent,
    AddCategoriesComponent,
    MenuItemsComponent,
    AddItemComponent,
    OrdersComponent,
    UsersComponent,
    ViewUserComponent,
    AddUserComponent,
    SettingsComponent,
    TagsComponent,
    EditTagesComponent,
    AddTagsComponent,
    BusinessInfoComponent,
    ViewOrderComponent,
    ProfileComponent,
    EditCategoryComponent,
    ViewCategoryComponent,
    NewsComponent,
    AddNewsComponent,
    EditNewsComponent,
    ViewNewsComponent,
    ViewItemComponent,
    EditItemComponent,
    AddCouponsComponent,
    CouponsComponent,
    PushNotificationComponent,
    ChatComponent,
    ChatBoxComponent,
    TableBookingComponent,
    ContactUsComponent,
    ClockPickerComponent,
    EditCouponComponent,
    ViewCouponComponent
    //FoodPickupComponent
  ],
  providers: [
    AuthService,
    LoginService
  ],

  exports: [RouterModule,
    Ng2PaginationModule,
    DataTableModule,AngularMultiSelectModule
  ]
})


export class RestaurantModule {
}
