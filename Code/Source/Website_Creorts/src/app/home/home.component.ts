import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from '../config.service';
import {HomeService} from './home.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latestNews: any={};
  carsoels: any=[]
  carouselimage: any=[];

  constructor(private restService:HomeService,public configService: ConfigService) {
    this.getLatestnews();
    this.getCarousels();
   }

  ngOnInit(): void {
  }
  getLatestnews(){
    this.restService.getlatestnews().subscribe(data=>{
        console.log(data);
        this.latestNews=data;
    })
  }
  getCarousels(){
    this.restService.getcarousels().subscribe(data=>{
        console.log(data);
        this.carsoels = data;
        for(let i=0;i<this.carsoels.length;i++){
          this.carsoels[i]["URL"]= this.configService.API_ENDPOINT+"carousel/download/id"+this.carsoels[i]._id+'?id='+this.carsoels[i]._id+'&carousel='+this.carsoels[i].carousel
        }

        console.log("Carousel data ", this.carsoels)
        this.carouselimage=this.carsoels;
       
    })
  }

}
