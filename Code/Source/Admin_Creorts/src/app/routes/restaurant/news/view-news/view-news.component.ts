import {Component} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {NgForm} from '@angular/forms';
import {NewsService} from '../news.service';

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.scss'],
  providers: [NewsService]
})
export class ViewNewsComponent {

  public newsDetails: any = {};

  constructor(private route: ActivatedRoute,
              public router: Router,
              public newsService: NewsService) {
    this.route.params.map(params => params['id']).subscribe((Id) => {
      if (Id != null) {
        newsService.getCaroselById(Id)
          .subscribe(response => {
            this.newsDetails = response;
          })
      }
    });
  }

}
