import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLanguageModalComponent } from './create-language-modal.component';

describe('CreateLanguageModalComponent', () => {
  let component: CreateLanguageModalComponent;
  let fixture: ComponentFixture<CreateLanguageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLanguageModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLanguageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
