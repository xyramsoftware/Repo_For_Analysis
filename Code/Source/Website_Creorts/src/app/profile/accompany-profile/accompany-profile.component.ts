import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accompany-profile',
  templateUrl: './accompany-profile.component.html',
  styleUrls: ['./accompany-profile.component.css']
})
export class AccompanyProfileComponent implements OnInit {

  @Input() accompany: any;

  constructor() { }

  ngOnInit(): void {
  }

}
