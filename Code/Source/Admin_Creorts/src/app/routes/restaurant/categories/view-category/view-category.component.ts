import {Component} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../categories.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss'],
  providers: [CategoriesService]
})
export class ViewCategoryComponent {

  public categoryDetails: any = {};

  constructor(private route: ActivatedRoute,
              public router: Router,
              public categoriesService: CategoriesService) {

    // this.route.params.map(params => params['id']).subscribe((Id) => {

    //   if (Id != null) {

    //     this.categoriesService.getCategoryById(Id)
    //       .subscribe(response => {
    //         this.categoryDetails = response;
    //       })
    //   }
    // });
  }

}
