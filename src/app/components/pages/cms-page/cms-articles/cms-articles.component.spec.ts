import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsArticlesComponent } from './cms-articles.component';

describe('CmsArticlesComponent', () => {
  let component: CmsArticlesComponent;
  let fixture: ComponentFixture<CmsArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
