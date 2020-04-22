import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccompanyProfileComponent } from './accompany-profile.component';

describe('AccompanyProfileComponent', () => {
  let component: AccompanyProfileComponent;
  let fixture: ComponentFixture<AccompanyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccompanyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
