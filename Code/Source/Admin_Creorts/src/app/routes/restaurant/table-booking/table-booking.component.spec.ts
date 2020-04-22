import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBookingComponent } from './table-booking.component';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { TableBookingService } from './table-booking.service';
describe('TableBookingComponent', () => {
  let component: TableBookingComponent;
  let fixture: ComponentFixture<TableBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBookingComponent ],
      providers: [HttpClient,TableBookingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
