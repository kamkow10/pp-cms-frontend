import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsSecurityComponent } from './cms-security.component';

describe('CmsSecurityComponent', () => {
  let component: CmsSecurityComponent;
  let fixture: ComponentFixture<CmsSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsSecurityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
