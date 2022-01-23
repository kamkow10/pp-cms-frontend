import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsAdministrationUsersComponent } from './cms-administration-users.component';

describe('CmsAdministrationUsersComponent', () => {
  let component: CmsAdministrationUsersComponent;
  let fixture: ComponentFixture<CmsAdministrationUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsAdministrationUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsAdministrationUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
