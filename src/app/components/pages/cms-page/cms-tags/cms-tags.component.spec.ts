import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsTagsComponent } from './cms-tags.component';

describe('CmsTagsComponent', () => {
  let component: CmsTagsComponent;
  let fixture: ComponentFixture<CmsTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
