import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsMyArticlesComponent } from './cms-my-articles.component';

describe('CmsMyArticlesComponent', () => {
  let component: CmsMyArticlesComponent;
  let fixture: ComponentFixture<CmsMyArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsMyArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsMyArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
