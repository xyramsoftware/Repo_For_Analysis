import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSuccesComponent } from './update-succes.component';

describe('UpdateSuccesComponent', () => {
  let component: UpdateSuccesComponent;
  let fixture: ComponentFixture<UpdateSuccesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSuccesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
