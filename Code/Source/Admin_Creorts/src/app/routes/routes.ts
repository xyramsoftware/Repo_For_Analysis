import { NgModule } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';

import { LoginComponent } from './pages/login/login.component';

import { RegisterComponent } from './pages/register/register.component';
import { RecoverComponent } from './pages/recover/recover.component';
import { Error404Component } from './pages/error404/error404.component';

import { HomeComponent } from './home/home/home.component';

import { CategoriesComponent } from './restaurant/categories/categories.component';
import { AddCategoriesComponent } from './restaurant/categories/add-categories/add-categories.component';
import { MenuItemsComponent } from './restaurant/menu-items/menu-items.component';
import { AddItemComponent } from './restaurant/menu-items/add-item/add-item.component';
import { OrdersComponent } from './restaurant/orders/orders.component';
import { ViewOrderComponent } from './restaurant/orders/view-order/view-order.component';
import { UsersComponent } from './restaurant/users/users.component';
import { AddUserComponent } from './restaurant/users/add-user/add-user.component';
import { ViewUserComponent } from './restaurant/users/view-user/view-users.component';
import { SettingsComponent } from './restaurant/settings/settings.component';
import { TagsComponent } from './restaurant/tags/tags.component';
import { EditTagesComponent } from './restaurant/tags/edit-tages/edit-tages.component';
import { AddTagsComponent } from './restaurant/tags/add-tags/add-tags.component';
import { BusinessInfoComponent } from './restaurant/business-info/business-info.component';
import { ProfileComponent } from './restaurant/profile/profile.component';
import { EditCategoryComponent } from './restaurant/categories/edit-category/edit-category.component';
import { ViewCategoryComponent } from './restaurant/categories/view-category/view-category.component';
import { ViewItemComponent } from './restaurant/menu-items/view-item/view-item.component';
import { EditItemComponent } from './restaurant/menu-items/edit-item/edit-item.component';
import { NewsComponent } from './restaurant/news/news.component';
import { AddNewsComponent } from './restaurant/news/add-news/add-news.component';
import { EditNewsComponent } from './restaurant/news/edit-news/edit-news.component';
import { ViewNewsComponent } from './restaurant/news/view-news/view-news.component';
import { EditCouponComponent } from './restaurant/coupons/edit-coupon/edit-coupon.component';
import { ViewCouponComponent } from './restaurant/coupons/view-coupon/view-coupon.component';
import { FoodPickupComponent } from './restaurant/pickup/pickup.compoent';
import { ReportComponent } from './restaurant/reports/reports.compoent';
import { AddPickupComponent } from './restaurant/pickup/addpickup/addpickup';
import { TableBookingComponent } from './restaurant/table-booking/table-booking.component';
import { ContactUsComponent } from './restaurant/contact-us/contact-us.component';

import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { AuthService } from './pages/login/auth.service';
import { LoginService } from './pages/login/login.service';
import { Ng2PaginationModule } from 'ng2-pagination';
import { DataTableModule } from 'angular2-datatable';

import { CouponsComponent } from './restaurant/coupons/coupons.component';
import { AddCouponsComponent } from './restaurant/coupons/add-coupons/add-coupons.component';

import { PushNotificationComponent } from './restaurant/push-notification/push-notification.component';

import { ChatComponent } from './restaurant/chat/chat.component';

export const routes = [
  { path: '', component: LoginComponent, useAsDefault: true },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthService] },
      {
        path: 'pushNotification',
        component: PushNotificationComponent,
        canActivate: [AuthService]
      },

      {
        path: 'coupons',
        children: [
          {
            path: 'all',
            component: CouponsComponent,
            canActivate: [AuthService]
          },
          {
            path: 'addCoupons',
            component: AddCouponsComponent,
            canActivate: [AuthService]
          },
          {
            path: 'editCoupon/:id',
            component: EditCouponComponent,
            canActivate: [AuthService]
          },
          {
            path: 'viewCoupon/:id',
            component: ViewCouponComponent,
            canActivate: [AuthService]
          }
        ]
      },

      {
        path: 'Events',
        children: [
          {
            path: 'manageindividualEvents',
            component: CategoriesComponent,
            canActivate: [AuthService]
          },
          {
            path: 'addindividualEvents',
            component: AddCategoriesComponent,
            canActivate: [AuthService]
          },
          {
            path: 'editTest/:id',
            component: EditCategoryComponent,
            canActivate: [AuthService]
          },
          {
            path: 'viewCategory/:id',
            component: ViewCategoryComponent,
            canActivate: [AuthService]
          }
        ]
      },

      {
        path: 'carousels',
        children: [
            {path: 'manageCarousels', component: NewsComponent, canActivate: [AuthService]},
            {path: 'addCarousels', component: AddNewsComponent, canActivate: [AuthService]},
            {path: 'editCarousels/:id', component: EditNewsComponent, canActivate: [AuthService]},
            {path: 'viewCarousels/:id', component: ViewNewsComponent, canActivate: [AuthService]}
        ]
    },

      {
        path: 'order',
        children: [
          {
            path: 'allOrder',
            component: OrdersComponent,
            canActivate: [AuthService]
          },
          {
            path: 'viewOrder',
            component: ViewOrderComponent,
            canActivate: [AuthService]
          },
          {
            path: 'viewOrder/:id',
            component: ViewOrderComponent,
            canActivate: [AuthService]
          }
        ]
      },

      {
        path: 'registration',
        children: [
          {
            path: 'registrationDetails',
            component: OrdersComponent,
            canActivate: [AuthService]
          },
          {
            path: 'viewOrder',
            component: ViewOrderComponent,
            canActivate: [AuthService]
          }
        ]
      },
      {
        path: 'prescriptions',
        children: [
          {
            path: 'prescriptions',
            component: FoodPickupComponent,
            canActivate: [AuthService]
          },
          {
            path: 'addPickup',
            component: AddPickupComponent,
            canActivate: [AuthService]
          }
        ]
      },

      {
        path: 'reports',
        children: [
          {
            path: 'report',
            component: ReportComponent,
            canActivate: [AuthService]
          }
        ]
      },

      {
        path: 'Category',
        children: [
          {
            path: 'manageCategory',
            component: MenuItemsComponent,
            canActivate: [AuthService]
          },
          {
            path: 'addCategory',
            component: AddItemComponent,
            canActivate: [AuthService]
          },
          {
            path: 'viewCategory/:id',
            component: ViewItemComponent,
            canActivate: [AuthService]
          },
          {
            path: 'editCategory/:id',
            component: EditItemComponent,
            canActivate: [AuthService]
          }
        ]
      },

      {
        path: 'users',
        children: [
          {
            path: 'manageUsers',
            component: UsersComponent,
            canActivate: [AuthService]
          },
          {
            path: 'addUser',
            component: AddUserComponent,
            canActivate: [AuthService]
          },
          {
            path: 'viewUser/:id',
            component: ViewUserComponent,
            canActivate: [AuthService]
          }
        ]
      },

      {
        path: 'tags',
        children: [
          { path: 'all', component: TagsComponent, canActivate: [AuthService] },
          {
            path: 'addTags',
            component: AddTagsComponent,
            canActivate: [AuthService]
          },
          {
            path: 'editTags/:id',
            component: EditTagesComponent,
            canActivate: [AuthService]
          }
        ]
      },

      { path: 'chat', component: ChatComponent, canActivate: [AuthService] },

      {
        path: 'setting',
        component: SettingsComponent,
        canActivate: [AuthService]
      },

      // {
      //   path: 'contacts',
      //   component: ContactUsComponent,
      //   canActivate: [AuthService]
      // },
      {
        path: 'contacts',
        children: [
          {
            path: 'all',
            component: ContactUsComponent,
            canActivate: [AuthService]
          },
          {
            path: 'all/:id',
            component: ContactUsComponent,
            canActivate: [AuthService]
          }
          
        ]
      },
      {
        path: 'table/booked',
        component: TableBookingComponent,
        canActivate: [AuthService]
      },

      {
        path: 'businessInfo',
        component: BusinessInfoComponent,
        canActivate: [AuthService]
      },

      {
        path: 'UserProfile',
        component: ProfileComponent,
        canActivate: [AuthService]
      }
    ] // children End
  },

  // Not lazy-loaded routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recover', component: RecoverComponent },
  { path: '404', component: Error404Component },

  // Not found
  { path: '**', redirectTo: '404' }
];

@NgModule({
  providers: [AuthService, LoginService]
})
class RestModule {}
