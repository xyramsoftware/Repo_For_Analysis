import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailspagePage } from './detailspage.page';

describe('DetailspagePage', () => {
  let component: DetailspagePage;
  let fixture: ComponentFixture<DetailspagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailspagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailspagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
