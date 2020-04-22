import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { from } from 'rxjs';
@Component({
  selector: 'app-accompany-success',
  templateUrl: './accompany-success.component.html',
  styleUrls: ['./accompany-success.component.css']
})
export class AccompanySuccessComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['']);

  }

}
