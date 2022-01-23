import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Language} from "../../../../../models/language";
import {TranslationService} from "../../../../../services/translation/translation.service";
import {Tag} from "../../../../../models/tag";
import {TagService} from "../../../../../services/tag/tag.service";

@Component({
  selector: 'app-create-article-modal',
  templateUrl: './create-article-modal.component.html',
  styleUrls: ['./create-article-modal.component.scss']
})
export class CreateArticleModalComponent implements OnInit {
  public createArticleForm = this.fb.group({
    'title': ['', Validators.required],
    'language': ['english', Validators.required],
    'tags': new FormArray([], Validators.required),
    'content': ['', Validators.required]
  })
  public languages: Language[];
  public languageTags: Tag[];
  public showMessageServerError = false;
  public submitted = false;

  constructor(private fb: FormBuilder,
              private translationService: TranslationService,
              private tagService: TagService) {
  }

  ngOnInit(): void {
    this.translationService.getLanguages().subscribe(languages => {
      this.languages = languages;
      this.language?.setValue(this.languages[0].name);
    });
    this.loadTagsForLanguage();
  }

  public loadTagsForLanguage(): void {
    this.tagService.getTags(this.language?.value).subscribe(tags => {
      this.languageTags = tags;
      while (this.tags?.length !== 0) {
        this.tags?.removeAt(0)
      }
      this.languageTags.forEach(() => {
        this.tags?.push(new FormControl(false));
      })
    });
  }

  get title(): AbstractControl | null {
    return this.createArticleForm.get('title');
  }

  get language(): AbstractControl | null {
    return this.createArticleForm.get('language');
  }

  get tags(): FormArray | null {
    return this.createArticleForm.get('tags') as FormArray;
  }

  get content(): AbstractControl | null {
    return this.createArticleForm.get('content');
  }

}
