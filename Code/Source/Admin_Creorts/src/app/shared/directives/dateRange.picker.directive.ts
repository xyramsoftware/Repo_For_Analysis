import {Directive, ElementRef, OnInit, Input, Output, EventEmitter} from '@angular/core';
 import * as $ from 'jquery';

@Directive({
  selector: '[daterangepicker]'
})

export class DateRangePickerDirective implements OnInit {
  @Input() options: Object = {};
  @Output() selected: any = new EventEmitter();
  @Output() assignmentSelected: any = new EventEmitter();
  @Output() endDate: any = new EventEmitter();

  constructor(private elementRef: ElementRef) {
      alert("date picker")
      console.log("date")
   }

  ngOnInit() {
    this.dateRangePicker();
    // (<any>(this.elementRef.nativeElement)).daterangepicker(this.options, this.dateCallback.bind(this));
  }
  dateCallback(start: any, end: any, label: any) {
    let message = `${start.format('DD-MM-YYYY')}`;
    let endDate = `${end.format('DD-MM-YYYY')}`;
    let assignmentDate = `${start.format('DD-MM-YYYY')}`;
    let response = {startDate : message, endDate: endDate};
    this.assignmentSelected.emit(response);
  }
  dateRangePicker() {
   
    (<any>$(this.elementRef.nativeElement)).daterangepicker(this.options, this.dateCallback.bind(this));
  }

}
