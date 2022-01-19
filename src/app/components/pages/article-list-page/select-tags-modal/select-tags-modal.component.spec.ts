import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTagsModalComponent } from './select-tags-modal.component';

describe('SelectTagsModalComponent', () => {
  let component: SelectTagsModalComponent;
  let fixture: ComponentFixture<SelectTagsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTagsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTagsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
