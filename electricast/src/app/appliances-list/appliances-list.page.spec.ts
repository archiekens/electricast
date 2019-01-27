import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliancesListPage } from './appliances-list.page';

describe('AppliancesListPage', () => {
  let component: AppliancesListPage;
  let fixture: ComponentFixture<AppliancesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliancesListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliancesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
