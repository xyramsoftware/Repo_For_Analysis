import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from '../config.service';
import {GalleryService} from './gallery.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  p: number = 1;
  items: any = [{}];

  constructor(private restService:GalleryService) {
    this.images();
   }

  ngOnInit(): void {
  }
  images(){
    this.restService.getimages().subscribe(data=>{ 
      console.log(data);
      this.items=data;
    })
  }

}
