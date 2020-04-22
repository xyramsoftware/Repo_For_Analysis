import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MenuItemsService } from '../menu-items.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss'],
  providers: [MenuItemsService]
})
export class ViewItemComponent {
  public menuDetails: any = {};

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public menuItemsService: MenuItemsService
  ) {
    this.route.params.map(params => params['id']).subscribe(Id => {
      if (Id != null) {
        menuItemsService.getMenuItemById(Id).subscribe(response => {
          this.menuDetails = response;
          console.log(this.menuDetails);
        });
      }
    });
  }
}
