import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsUsersComponent } from './cms-users.component';

describe('CmsUsersComponent', () => {
  let component: CmsUsersComponent;
  let fixture: ComponentFixture<CmsUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
