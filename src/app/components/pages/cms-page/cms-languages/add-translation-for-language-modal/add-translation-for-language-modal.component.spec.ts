import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTranslationForLanguageModalComponent } from './add-translation-for-language-modal.component';

describe('AddTranslationForLanguageModalComponent', () => {
  let component: AddTranslationForLanguageModalComponent;
  let fixture: ComponentFixture<AddTranslationForLanguageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTranslationForLanguageModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTranslationForLanguageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
