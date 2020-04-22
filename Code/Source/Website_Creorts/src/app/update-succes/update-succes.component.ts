import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { from } from 'rxjs';
@Component({
  selector: 'app-update-succes',
  templateUrl: './update-succes.component.html',
  styleUrls: ['./update-succes.component.css']
})
export class UpdateSuccesComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  login(){
    this.router.navigate(['']);

  }

}
