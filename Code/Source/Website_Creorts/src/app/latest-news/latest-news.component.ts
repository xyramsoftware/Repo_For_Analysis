import { Component, OnInit } from '@angular/core';
import { LatestNewsService } from './latest-news.service';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent implements OnInit {
  latestNews: any;

  constructor(private restService: LatestNewsService) { 
    this.getLatestnews();
   }

  ngOnInit(): void {
  }

  getLatestnews(){
    this.restService.getlatestnews().subscribe(data=>{
        console.log(data);
        this.latestNews=data;
    })
  }

}
