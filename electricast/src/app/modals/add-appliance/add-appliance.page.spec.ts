import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppliancePage } from './add-appliance.page';

describe('AddAppliancePage', () => {
  let component: AddAppliancePage;
  let fixture: ComponentFixture<AddAppliancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppliancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppliancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
