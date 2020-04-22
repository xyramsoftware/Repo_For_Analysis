import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverpagePage } from './popoverpage.page';

describe('PopoverpagePage', () => {
  let component: PopoverpagePage;
  let fixture: ComponentFixture<PopoverpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
