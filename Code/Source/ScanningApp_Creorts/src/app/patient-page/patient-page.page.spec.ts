import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPagePage } from './patient-page.page';

describe('PatientPagePage', () => {
  let component: PatientPagePage;
  let fixture: ComponentFixture<PatientPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
