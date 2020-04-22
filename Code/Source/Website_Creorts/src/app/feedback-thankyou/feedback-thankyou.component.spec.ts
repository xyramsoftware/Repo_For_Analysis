import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackThankyouComponent } from './feedback-thankyou.component';

describe('FeedbackThankyouComponent', () => {
  let component: FeedbackThankyouComponent;
  let fixture: ComponentFixture<FeedbackThankyouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackThankyouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
