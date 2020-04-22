import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { from } from 'rxjs';
@Component({
  selector: 'app-feedback-thankyou',
  templateUrl: './feedback-thankyou.component.html',
  styleUrls: ['./feedback-thankyou.component.css']
})
export class FeedbackThankyouComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['']);

  }

}
