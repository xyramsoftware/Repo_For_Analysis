import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccompanySuccessComponent } from './accompany-success.component';

describe('AccompanySuccessComponent', () => {
  let component: AccompanySuccessComponent;
  let fixture: ComponentFixture<AccompanySuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccompanySuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccompanySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
