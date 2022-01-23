import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsLanguagesComponent } from './cms-languages.component';

describe('CmsLanguagesComponent', () => {
  let component: CmsLanguagesComponent;
  let fixture: ComponentFixture<CmsLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsLanguagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
