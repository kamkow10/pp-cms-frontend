import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTranslationModalComponent } from './create-translation-modal.component';

describe('CreateTranslationModalComponent', () => {
  let component: CreateTranslationModalComponent;
  let fixture: ComponentFixture<CreateTranslationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTranslationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTranslationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
